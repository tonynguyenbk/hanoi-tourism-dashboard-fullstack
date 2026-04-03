import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Download, User, Clock, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

const pageTitles = {
  '/tong-quan':  'Tổng quan',
  '/luot-khach': 'Theo dõi lượt khách',
  '/luu-tru':    'Công suất lưu trú',
  '/phan-anh':   'Phản ánh du khách',
  '/ban-do':     'Bản đồ điểm đến đông',
  '/goi-y':      'Gợi ý điều tiết',
  '/bao-cao':    'Xuất báo cáo',
}

/**
 * Header — Thanh trên với tiêu đề, đồng hồ, nút xuất báo cáo
 * Props:
 *   onMenuClick — Callback mở sidebar trên mobile
 */
function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = pageTitles[pathname] || 'Dashboard'

  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 shadow-sm flex-shrink-0">
      {/* Hamburger — chỉ hiện trên mobile */}
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
        {/* Nút xuất báo cáo — ẩn label trên mobile */}
        <button
          onClick={() => navigate('/bao-cao')}
          className="flex items-center gap-2 px-3 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: '#1B4F72' }}
        >
          <Download size={15} />
          <span className="hidden sm:inline">Xuất báo cáo</span>
        </button>

        {/* Thông báo */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow" />
        </button>

        {/* Avatar người dùng */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: '#2E86C1' }}
          >
            QT
          </div>
          <div className="hidden lg:block leading-tight">
            <p className="text-xs font-semibold text-gray-700">Quản trị viên</p>
            <p className="text-xs text-gray-400">Sở Du lịch HN</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
