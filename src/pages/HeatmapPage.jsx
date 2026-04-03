import { Suspense, lazy, useState } from 'react'
import AlertCard from '../components/Cards/AlertCard'
import LineChart from '../components/Charts/LineChart'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { DESTINATIONS, DENSITY_BY_HOUR } from '../data/destinations'
import { getAlertLevel } from '../utils/thresholds'
import { MapPin, RefreshCw } from 'lucide-react'

// Lazy load bản đồ — Leaflet không hỗ trợ SSR
const HanoiHeatmap = lazy(() => import('../components/Map/HanoiHeatmap'))

// Mật độ mô phỏng "hiện tại" (giờ cao điểm 16h)
const BASE_DENSITY = {
  'hoan-kiem':      78,
  'van-mieu':       55,
  'lang-bac':       62,
  'hoang-thanh':    45,
  'chua-mot-cot':   70,
  'chua-tran-quoc': 58,
  'pho-di-bo':      97,
  'bat-trang':      40,
  'ho-tay':         50,
  'nha-tho-lon':    88,
}

// Màu badge theo mức độ
function LevelBadge({ density }) {
  if (density >= 95) return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-medium">Quá tải</span>
  if (density >= 80) return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">Đông</span>
  if (density >= 50) return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">Bình thường</span>
  return <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">Thưa</span>
}

/**
 * HeatmapPage — Module 4: Bản đồ điểm đến đông
 * Bao gồm: bản đồ Leaflet, bảng mật độ, biểu đồ theo giờ, cảnh báo
 */
function HeatmapPage() {
  // Dữ liệu mật độ — có thể điều chỉnh qua slider (demo)
  const [densityData, setDensityData] = useState(BASE_DENSITY)
  const [selectedDest, setSelectedDest] = useState(null)
  const [lastUpdated, setLastUpdated]   = useState(new Date())

  // Điểm đang chọn (click trên bản đồ)
  const selectedInfo = selectedDest
    ? DESTINATIONS.find((d) => d.id === selectedDest.id)
    : null

  // Cảnh báo các điểm quá ngưỡng
  const alerts = DESTINATIONS.filter((d) => {
    const density = densityData[d.id] ?? d.defaultDensity
    return getAlertLevel(density, 'destination') !== 'normal'
  })

  // Mô phỏng "cập nhật dữ liệu" — thêm nhiễu ngẫu nhiên nhỏ
  const handleRefresh = () => {
    const updated = {}
    Object.entries(densityData).forEach(([id, val]) => {
      const delta = Math.round((Math.random() - 0.5) * 6) // ±3%
      updated[id] = Math.max(10, Math.min(100, val + delta))
    })
    setDensityData(updated)
    setLastUpdated(new Date())
  }

  return (
    <div className="space-y-4">
      {/* Cảnh báo điểm vượt ngưỡng */}
      {alerts.map((d) => {
        const density = densityData[d.id] ?? d.defaultDensity
        const level   = getAlertLevel(density, 'destination')
        return (
          <AlertCard
            key={d.id}
            type={level === 'critical' ? 'critical' : 'warning'}
            title={`${d.name}: ${density}% sức chứa — ${level === 'critical' ? 'Quá tải' : 'Đông khách'}`}
            message={level === 'critical' ? 'Cần tăng cường nhân lực và điều hướng du khách ngay' : 'Theo dõi sát, chuẩn bị phương án hỗ trợ'}
            dismissible
          />
        )
      })}

      {/* Bản đồ + Bảng mật độ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Bản đồ — chiếm 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header bản đồ */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" style={{ color: '#2E86C1' }} />
              <span className="font-semibold text-gray-800 text-sm">Bản đồ mật độ du khách</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                Cập nhật: {lastUpdated.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-600 transition-colors"
              >
                <RefreshCw size={12} />
                Làm mới
              </button>
            </div>
          </div>

          {/* Chú thích màu */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: '#27AE60' }} /> &lt;50% Thưa</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: '#2E86C1' }} /> 50–79% Bình thường</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: '#F39C12' }} /> 80–94% Đông</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: '#E74C3C' }} /> ≥95% Quá tải</span>
          </div>

          <div style={{ height: 430 }}>
            <Suspense fallback={<LoadingSpinner fullPage text="Đang tải bản đồ..." />}>
              <HanoiHeatmap densityData={densityData} onSelectDest={setSelectedDest} />
            </Suspense>
          </div>
        </div>

        {/* Bảng mật độ — 1/3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Mật độ các điểm đến</h3>
          <div className="space-y-3 max-h-[530px] overflow-y-auto pr-1">
            {DESTINATIONS
              .map((d) => ({ ...d, density: densityData[d.id] ?? d.defaultDensity }))
              .sort((a, b) => b.density - a.density) // Sắp xếp giảm dần
              .map((d) => {
                const barColor =
                  d.density >= 95 ? 'bg-red-500' :
                  d.density >= 80 ? 'bg-yellow-400' :
                  d.density >= 50 ? 'bg-blue-500' : 'bg-green-500'
                const isSelected = selectedDest?.id === d.id

                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDest(isSelected ? null : d)}
                    className={`p-2.5 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-blue-50 ring-1 ring-blue-300' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700 leading-tight truncate max-w-[140px]">
                        {d.name}
                      </span>
                      <LevelBadge density={d.density} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className={`${barColor} h-1.5 rounded-full transition-all`} style={{ width: `${d.density}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8 text-right">{d.density}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{d.district}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Biểu đồ mật độ theo giờ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-1">Biến động mật độ theo giờ — Hôm nay</h3>
        <p className="text-xs text-gray-400 mb-4">Cao điểm buổi chiều 14h–17h tại khu vực Hoàn Kiếm</p>
        <LineChart
          data={DENSITY_BY_HOUR}
          xKey="gio"
          lines={[
            { key: 'Phố đi bộ', name: 'Phố đi bộ HG',  color: '#E74C3C' },
            { key: 'Hồ HK',     name: 'Hồ Hoàn Kiếm',  color: '#2E86C1' },
            { key: 'Văn Miếu',  name: 'Văn Miếu',       color: '#27AE60' },
          ]}
          height={220}
          formatter={(v) => `${v}%`}
        />
      </div>

      {/* Panel chi tiết điểm đang chọn */}
      {selectedInfo && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{selectedInfo.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">Quận/Huyện: {selectedInfo.district}</p>
            </div>
            <button onClick={() => setSelectedDest(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xl font-bold text-blue-600">{densityData[selectedInfo.id] ?? selectedInfo.defaultDensity}%</p>
              <p className="text-xs text-gray-500 mt-0.5">Mật độ hiện tại</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xl font-bold text-gray-700">{selectedInfo.capacity.toLocaleString('vi-VN')}</p>
              <p className="text-xs text-gray-500 mt-0.5">Sức chứa (người)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xl font-bold text-gray-700">
                {Math.round(selectedInfo.capacity * (densityData[selectedInfo.id] ?? selectedInfo.defaultDensity) / 100).toLocaleString('vi-VN')}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Ước tính hiện có</p>
            </div>
          </div>
          {/* Điểm đến lân cận */}
          {selectedInfo.nearbyIds.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 mb-2">Điểm đến lân cận có thể điều hướng:</p>
              <div className="flex flex-wrap gap-2">
                {selectedInfo.nearbyIds.map((nid) => {
                  const nd = DESTINATIONS.find((d) => d.id === nid)
                  if (!nd) return null
                  const ndDensity = densityData[nid] ?? nd.defaultDensity
                  return (
                    <span key={nid} className="px-2.5 py-1 bg-green-50 border border-green-200 rounded-lg text-xs font-medium text-green-700">
                      {nd.name.split('–')[0].trim()} ({ndDensity}%)
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HeatmapPage
