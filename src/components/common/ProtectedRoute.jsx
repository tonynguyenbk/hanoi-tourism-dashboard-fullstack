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
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    // Lưu trang hiện tại vào state để sau login redirect về đúng chỗ
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // Đã đăng nhập → render bình thường
  return children
}

export default ProtectedRoute
