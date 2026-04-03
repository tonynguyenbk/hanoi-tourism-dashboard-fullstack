import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/common/ScrollToTop'
import DashboardLayout from './components/Layout/DashboardLayout'
import LoginPage from './pages/LoginPage'
import Overview from './pages/Overview'
import Visitors from './pages/Visitors'
import Accommodation from './pages/Accommodation'
import Feedback from './pages/Feedback'
import HeatmapPage from './pages/HeatmapPage'
import Recommendations from './pages/Recommendations'
import Reports from './pages/Reports'
import RequireAuth from './components/common/ProtectedRoute'

function App() {
  return (
    // AuthProvider bọc toàn app — mọi component con đều dùng được useAuth()
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Trang đăng nhập — public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes bảo vệ: RequireAuth kiểm tra login, rồi render DashboardLayout */}
          <Route path="/" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
            <Route index element={<Navigate to="/tong-quan" replace />} />
            <Route path="tong-quan"  element={<Overview />} />
            <Route path="luot-khach" element={<Visitors />} />
            <Route path="luu-tru"    element={<Accommodation />} />
            <Route path="phan-anh"   element={<Feedback />} />
            <Route path="ban-do"     element={<HeatmapPage />} />
            <Route path="goi-y"      element={<Recommendations />} />
            <Route path="bao-cao"    element={<Reports />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/tong-quan" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
