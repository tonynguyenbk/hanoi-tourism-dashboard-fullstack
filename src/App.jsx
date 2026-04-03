import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/Layout/DashboardLayout'
import ScrollToTop from './components/common/ScrollToTop'
import Overview from './pages/Overview'
import Visitors from './pages/Visitors'
import Accommodation from './pages/Accommodation'
import Feedback from './pages/Feedback'
import HeatmapPage from './pages/HeatmapPage'
import Recommendations from './pages/Recommendations'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Tất cả routes nằm trong DashboardLayout (có sidebar + header) */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/tong-quan" replace />} />
          <Route path="tong-quan" element={<Overview />} />
          <Route path="luot-khach" element={<Visitors />} />
          <Route path="luu-tru" element={<Accommodation />} />
          <Route path="phan-anh" element={<Feedback />} />
          <Route path="ban-do" element={<HeatmapPage />} />
          <Route path="goi-y" element={<Recommendations />} />
          <Route path="bao-cao" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
