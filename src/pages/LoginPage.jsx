import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, LogIn, MapPin } from 'lucide-react'

// Danh sách tài khoản demo hiển thị cho người dùng thấy
const DEMO_ACCOUNTS = [
  { username: 'admin',    password: 'admin123',    role: 'Admin',        desc: 'Toàn quyền' },
  { username: 'giamdoc',  password: 'giamdoc123',  role: 'Giám đốc',    desc: 'Toàn quyền' },
  { username: 'canbo',    password: 'canbo123',     role: 'Cán bộ',      desc: 'Xem + Phản ánh' },
  { username: 'viewer',   password: 'viewer123',    role: 'Khách xem',   desc: 'Chỉ xem' },
]

/**
 * LoginPage — Trang đăng nhập Dashboard Du lịch Hà Nội
 * Sau khi đăng nhập thành công, chuyển về trang người dùng định vào
 * (hoặc /tong-quan nếu vào thẳng /login)
 */
function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  // Trang định vào trước khi bị chặn bởi ProtectedRoute
  const from = location.state?.from || '/tong-quan'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ thông tin')
      return
    }

    setLoading(true)
    setError('')

    // Giả lập độ trễ network nhỏ để UX tự nhiên hơn
    await new Promise((r) => setTimeout(r, 500))

    const result = login(username, password)
    setLoading(false)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  // Click vào tài khoản demo → điền sẵn form
  const fillDemo = (acc) => {
    setUsername(acc.username)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 60%, #5DADE2 100%)' }}>

      {/* ─── Panel trái: Thông tin hệ thống ─────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 text-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
            HN
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest opacity-75 uppercase">Sở Du lịch</p>
            <p className="font-bold text-lg leading-tight">Hà Nội</p>
          </div>
        </div>

        {/* Tiêu đề chính */}
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Dashboard<br />Điều hành<br />Du lịch Hà Nội
          </h1>
          <p className="text-blue-100 leading-relaxed max-w-sm">
            Hệ thống giám sát và điều hành du lịch tập trung, giúp lãnh đạo Sở đưa ra quyết định dựa trên dữ liệu thời gian thực.
          </p>

          {/* Tính năng nổi bật */}
          <div className="mt-8 space-y-3">
            {[
              'Theo dõi lượt khách theo ngày/tuần/tháng',
              'Cảnh báo công suất lưu trú theo khu vực',
              'Bản đồ mật độ điểm đến (Heatmap)',
              'Gợi ý điều tiết tự động (Rule-based AI)',
              'Xuất báo cáo PDF tuần/tháng',
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-blue-100">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-blue-200 text-xs">
          <MapPin size={13} />
          <span>Sở Du lịch Hà Nội · Dự án KHKT 2026</span>
        </div>
      </div>

      {/* ─── Panel phải: Form đăng nhập ──────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Header form */}
            <div className="text-center mb-8">
              {/* Logo mobile */}
              <div className="lg:hidden w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center font-bold text-white text-lg"
                   style={{ background: '#1B4F72' }}>
                HN
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
              <p className="text-sm text-gray-500 mt-1">Hệ thống Dashboard Du lịch Hà Nội</p>
            </div>

            {/* Thông báo lỗi */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
                <span className="text-red-500">⚠</span>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tên đăng nhập */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError('') }}
                  placeholder="Nhập tên đăng nhập"
                  autoComplete="username"
                  autoFocus
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError('') }}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Nút đăng nhập */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(90deg, #1B4F72, #2E86C1)' }}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn size={16} />
                )}
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Tài khoản demo</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Tài khoản demo — click để điền sẵn */}
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-700">
                    {acc.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{acc.username} / {acc.password}</p>
                  <p className="text-xs text-blue-500 mt-0.5">{acc.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Caption dưới card */}
          <p className="text-center text-blue-100 text-xs mt-4 opacity-70">
            Hệ thống chỉ dành cho cán bộ Sở Du lịch Hà Nội
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
