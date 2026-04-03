import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/**
 * AuthContext — Quản lý trạng thái đăng nhập qua Supabase Auth
 * JWT token được Supabase quản lý tự động (lưu localStorage)
 */

// ─── Map username → email (để giữ UI đăng nhập bằng username) ────────────────
const USERNAME_TO_EMAIL = {
  admin:   'admin@hanoidulich.vn',
  giamdoc: 'giamdoc@hanoidulich.vn',
  canbo:   'canbo@hanoidulich.vn',
  viewer:  'viewer@hanoidulich.vn',
}

// ─── Quyền hạn theo role (giống Level 1) ─────────────────────────────────────
export const PERMISSIONS = {
  admin: {
    canExportReport:   true,
    canSubmitFeedback: true,
    canViewAll:        true,
  },
  staff: {
    canExportReport:   false,
    canSubmitFeedback: true,
    canViewAll:        true,
  },
  viewer: {
    canExportReport:   false,
    canSubmitFeedback: false,
    canViewAll:        true,
  },
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

/**
 * AuthProvider — Bọc toàn bộ app để cung cấp context auth
 */
export function AuthProvider({ children }) {
  // user = { id, email, username, name, title, role, avatar } hoặc null
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true) // Đang kiểm tra session ban đầu

  /**
   * Lấy profile từ bảng public.profiles theo user id
   */
  const fetchProfile = useCallback(async (supabaseUser) => {
    if (!supabaseUser) { setUser(null); return }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username, name, title, role, avatar')
      .eq('id', supabaseUser.id)
      .single()

    setUser({
      id:       supabaseUser.id,
      email:    supabaseUser.email,
      username: profile?.username ?? supabaseUser.email,
      name:     profile?.name    ?? supabaseUser.email,
      title:    profile?.title   ?? '',
      role:     profile?.role    ?? 'viewer',
      avatar:   profile?.avatar  ?? '?',
    })
  }, [])

  // Kiểm tra session khi app khởi động + lắng nghe thay đổi auth
  useEffect(() => {
    // Lấy session hiện tại (nếu đã đăng nhập từ trước)
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfile(session?.user ?? null).finally(() => setLoading(false))
    })

    // Lắng nghe sự kiện: đăng nhập / đăng xuất / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchProfile(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  /**
   * Đăng nhập bằng username + password
   * Nội bộ map username → email rồi gọi Supabase
   * @returns {{ success: boolean, error?: string }}
   */
  const login = useCallback(async (username, password) => {
    const email = USERNAME_TO_EMAIL[username.trim().toLowerCase()]

    if (!email) {
      return { success: false, error: 'Tên đăng nhập không tồn tại' }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' }
    }

    return { success: true }
  }, [])

  /**
   * Đăng xuất — Supabase xoá JWT khỏi localStorage tự động
   */
  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  /**
   * Kiểm tra quyền cụ thể
   */
  const can = useCallback((permission) => {
    if (!user) return false
    return PERMISSIONS[user.role]?.[permission] ?? false
  }, [user])

  const value = {
    user,
    login,
    logout,
    can,
    isLoggedIn: !!user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth — Hook dùng trong bất kỳ component nào cần thông tin auth
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải dùng bên trong <AuthProvider>')
  return ctx
}
