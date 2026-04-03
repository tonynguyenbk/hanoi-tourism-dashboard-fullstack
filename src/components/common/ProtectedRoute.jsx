import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute — Bảo vệ các route cần đăng nhập
 *
 * Nếu chưa đăng nhập → chuyển về /login, lưu lại trang đang định vào
 * để sau khi đăng nhập xong quay lại đúng trang đó.
 *
 * Dùng trong App.jsx:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="tong-quan" element={<Overview />} />
 *     ...
 *   </Route>
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  // Đang kiểm tra session từ Supabase — chờ để tránh flash redirect
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <span className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Đang tải...</span>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    // Lưu trang hiện tại vào state để sau login redirect về đúng chỗ
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // Đã đăng nhập → render bình thường
  return children
}

export default ProtectedRoute
