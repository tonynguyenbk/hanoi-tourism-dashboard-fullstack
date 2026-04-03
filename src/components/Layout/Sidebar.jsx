import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Building2,
  MessageSquare, Map, Lightbulb, FileText,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

// Cấu hình menu + badge cảnh báo (số đến từ dữ liệu thực tế)
const navItems = [
  { path: '/tong-quan',  label: 'Tổng quan',         icon: LayoutDashboard, badge: null },
  { path: '/luot-khach', label: 'Lượt khách',         icon: Users,           badge: null },
  { path: '/luu-tru',    label: 'Công suất lưu trú',  icon: Building2,       badge: 2    }, // 2 khu cảnh báo
  { path: '/phan-anh',   label: 'Phản ánh du khách',  icon: MessageSquare,   badge: 3    }, // 3 phản ánh mới
  { path: '/ban-do',     label: 'Bản đồ điểm đến',    icon: Map,             badge: 1    }, // 1 điểm quá tải
  { path: '/goi-y',      label: 'Gợi ý điều tiết',    icon: Lightbulb,       badge: 5    }, // 5 gợi ý
  { path: '/bao-cao',    label: 'Xuất báo cáo',        icon: FileText,        badge: null },
]

/**
 * Sidebar — Điều hướng chính, hỗ trợ collapsed mode (icon-only)
 * Props:
 *   collapsed     — true = thu gọn chỉ hiện icon
 *   onToggle      — callback đảo trạng thái collapsed
 */
function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className="flex flex-col shadow-xl transition-all duration-300 ease-in-out flex-shrink-0"
      style={{
        width: collapsed ? 64 : 240,
        background: 'linear-gradient(180deg, #1B4F72 0%, #154060 100%)',
        color: '#fff',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 border-b border-blue-700/50 overflow-hidden"
        style={{ padding: collapsed ? '16px 0' : '16px 20px', justifyContent: collapsed ? 'center' : 'flex-start', minHeight: 64 }}
      >
        {/* Icon logo */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
             style={{ background: '#2E86C1', minWidth: 32 }}>
          HN
        </div>
        {/* Tên — ẩn khi collapsed */}
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <p className="text-xs font-semibold text-blue-200 leading-tight uppercase tracking-wide whitespace-nowrap">
              Dashboard Điều hành
            </p>
            <p className="text-sm font-bold text-white whitespace-nowrap">Du lịch Hà Nội</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden"
           style={{ padding: collapsed ? '12px 8px' : '12px 10px' }}>
        {navItems.map(({ path, label, icon: Icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `group relative flex items-center rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'nav-active-bar text-white'
                  : 'text-blue-200/80 hover:text-white'
              }`
            }
            style={({ isActive }) => ({
              gap: collapsed ? 0 : 10,
              padding: collapsed ? '9px 0' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: isActive ? 'rgba(46,134,193,0.35)' : undefined,
            })}
          >
            {({ isActive }) => (
              <>
                <div className="relative flex-shrink-0">
                  <Icon size={18} />
                  {/* Badge nhỏ trên icon khi collapsed */}
                  {collapsed && badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white flex items-center justify-center"
                          style={{ fontSize: 8, lineHeight: 1 }}>
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </div>

                {/* Label + badge — ẩn khi collapsed */}
                {!collapsed && (
                  <span className="flex-1 truncate animate-fade-in">{label}</span>
                )}
                {!collapsed && badge && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[18px] text-center animate-fade-in"
                        style={{ fontSize: 10 }}>
                    {badge}
                  </span>
                )}

                {/* Tooltip khi collapsed — dùng title attribute, CSS tooltip */}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                        style={{ background: '#1B4F72', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {label}
                    {badge ? ` (${badge})` : ''}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Nút toggle collapse */}
      <div className="border-t border-blue-700/50" style={{ padding: collapsed ? '10px 8px' : '10px 10px' }}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-blue-300 hover:text-white hover:bg-blue-700/40 transition-colors text-xs font-medium"
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span className="animate-fade-in">Thu gọn</span>
            </>
          )}
        </button>

        {/* Version — ẩn khi collapsed */}
        {!collapsed && (
          <p className="text-center text-blue-400/50 text-xs mt-1 animate-fade-in">
            v1.0 · KHKT 2026
          </p>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
