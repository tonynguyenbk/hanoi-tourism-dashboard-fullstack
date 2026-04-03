import { createContext, useContext, useState, useCallback } from 'react'

/**
 * AuthContext — Quản lý trạng thái đăng nhập toàn app
 * Dữ liệu lưu trong localStorage để giữ session khi reload trang
 */

// ─── Danh sách tài khoản (mô phỏng, không cần backend) ───────────────────────
const USERS = [
  {
    id:       1,
    username: 'admin',
    password: 'admin123',
    role:     'admin',        // Toàn quyền: xem + xuất báo cáo + tiếp nhận phản ánh
    name:     'Nguyễn Văn A',
    title:    'Quản trị hệ thống',
    avatar:   'QT',
  },
  {
    id:       2,
    username: 'giamdoc',
    password: 'giamdoc123',
    role:     'admin',
    name:     'Trần Thị B',
    title:    'Giám đốc Sở Du lịch',
    avatar:   'GĐ',
  },
  {
    id:       3,
    username: 'canbo',
    password: 'canbo123',
    role:     'staff',        // Cán bộ: xem + tiếp nhận phản ánh, không xuất báo cáo
    name:     'Lê Văn C',
    title:    'Cán bộ chuyên môn',
    avatar:   'CB',
  },
  {
    id:       4,
    username: 'viewer',
    password: 'viewer123',
    role:     'viewer',       // Chỉ xem, không có quyền gì thêm
    name:     'Phạm Thị D',
    title:    'Khách xem',
    avatar:   'KX',
  },
]

// ─── Quyền hạn theo role ──────────────────────────────────────────────────────
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
 * Đọc user đã lưu từ localStorage (nếu có)
 */
function getStoredUser() {
  try {
    const raw = localStorage.getItem('hanoiDashboardUser')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * AuthProvider — Bọc toàn bộ app để cung cấp context auth
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  /**
   * Đăng nhập — kiểm tra username/password
   * @returns {{ success: boolean, error?: string }}
   */
  const login = useCallback((username, password) => {
    const found = USERS.find(
      (u) => u.username === username.trim() && u.password === password
    )

    if (!found) {
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' }
    }

    // Lưu vào state + localStorage (không lưu password)
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('hanoiDashboardUser', JSON.stringify(safeUser))
    return { success: true }
  }, [])

  /**
   * Đăng xuất
   */
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('hanoiDashboardUser')
  }, [])

  /**
   * Kiểm tra quyền cụ thể
   * @param {string} permission — tên quyền trong PERMISSIONS
   */
  const can = useCallback((permission) => {
    if (!user) return false
    return PERMISSIONS[user.role]?.[permission] ?? false
  }, [user])

  const value = { user, login, logout, can, isLoggedIn: !!user }

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
