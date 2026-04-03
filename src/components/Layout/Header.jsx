import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Download, Clock, Menu, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'

const pageTitles = {
  '/tong-quan':  'Tổng quan',
  '/luot-khach': 'Theo dõi lượt khách',
  '/luu-tru':    'Công suất lưu trú',
  '/phan-anh':   'Phản ánh du khách',
  '/ban-do':     'Bản đồ điểm đến đông',
  '/goi-y':      'Gợi ý điều tiết',
  '/bao-cao':    'Xuất báo cáo',
}

// Màu avatar theo role
const ROLE_COLOR = {
  admin:  '#1B4F72',
  staff:  '#16a34a',
  viewer: '#7c3aed',
}
const ROLE_LABEL = {
  admin:  'Quản trị viên',
  staff:  'Cán bộ',
  viewer: 'Khách xem',
}

/**
 * Header — Thanh trên với tiêu đề, đồng hồ, thông tin user, nút đăng xuất
 */
function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const { user, logout, can } = useAuth()
  const title = pageTitles[pathname] || 'Dashboard'

  // Đồng hồ
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Dropdown user menu
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    setMenuOpen(false)
    logout()
    navigate('/login')
  }

  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 shadow-sm flex-shrink-0">
      {/* Hamburger mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Tiêu đề + ngày giờ */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 mt-0.5">
          <Clock size={10} />
          <span className="truncate">{dateStr} — {timeStr}</span>
        </div>
      </div>

      {/* Actions bên phải */}
      <div className="flex items-center gap-2">
        {/* Nút xuất báo cáo — chỉ hiện với admin */}
        {can('canExportReport') && (
          <button
            onClick={() => navigate('/bao-cao')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-white rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1B4F72' }}
          >
            <Download size={15} />
            <span className="hidden md:inline">Xuất báo cáo</span>
          </button>
        )}

        {/* Thông báo */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow" />
        </button>

        {/* User menu dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: ROLE_COLOR[user?.role] || '#1B4F72' }}
            >
              {user?.avatar || 'U'}
            </div>
            {/* Tên + role — ẩn trên mobile nhỏ */}
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-xs font-semibold text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-400">{ROLE_LABEL[user?.role]}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-scale-in">
              {/* Thông tin user */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{user?.title}</p>
                <span
                  className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium text-white"
                  style={{ backgroundColor: ROLE_COLOR[user?.role] || '#1B4F72' }}
                >
                  {ROLE_LABEL[user?.role]}
                </span>
              </div>

              {/* Quyền hạn */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-400 mb-1.5">Quyền hạn</p>
                {[
                  { label: 'Xem dashboard',    ok: true },
                  { label: 'Gửi phản ánh',      ok: can('canSubmitFeedback') },
                  { label: 'Xuất báo cáo PDF',  ok: can('canExportReport') },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-xs py-0.5">
                    <span className={p.ok ? 'text-green-500' : 'text-red-400'}>
                      {p.ok ? '✓' : '✗'}
                    </span>
                    <span className={p.ok ? 'text-gray-700' : 'text-gray-400'}>{p.label}</span>
                  </div>
                ))}
              </div>

              {/* Nút đăng xuất */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut size={15} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
