import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

/**
 * DashboardLayout — Khung bố cục chính
 * - Desktop (≥1024px): sidebar cố định, có thể collapse
 * - Tablet (768–1023px): sidebar mặc định thu gọn
 * - Mobile (<768px): sidebar ẩn, mở qua overlay
 */
function DashboardLayout() {
  const location = useLocation()

  // Trên tablet mặc định thu gọn sidebar
  const getInitialCollapsed = () => window.innerWidth < 1024
  const [collapsed,       setCollapsed]       = useState(getInitialCollapsed)
  const [mobileOpen,      setMobileOpen]      = useState(false)
  const [pageKey,         setPageKey]         = useState(location.pathname)

  // Cập nhật pageKey mỗi khi đổi route → trigger animation
  useEffect(() => {
    setPageKey(location.pathname)
    setMobileOpen(false) // Đóng sidebar mobile khi chuyển trang
  }, [location.pathname])

  // Tự động thu gọn khi resize xuống tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setCollapsed(true)
      else setCollapsed(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay mobile — click để đóng sidebar */}
      {mobileOpen && (
        <div
          className="sidebar-overlay md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — ẩn trên mobile trừ khi mobileOpen */}
      <div className={`
        ${mobileOpen ? 'fixed z-40 inset-y-0 left-0' : 'hidden'}
        md:relative md:flex md:z-auto
      `}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
      </div>

      {/* Vùng nội dung chính */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} />

        {/* Main content với page transition */}
        <main
          key={pageKey}
          className="flex-1 overflow-y-auto p-4 md:p-6 page-enter"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
