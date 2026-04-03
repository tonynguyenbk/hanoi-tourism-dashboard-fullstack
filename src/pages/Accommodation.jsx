import GaugeChart from '../components/Charts/GaugeChart'
import LineChart from '../components/Charts/LineChart'
import AlertCard from '../components/Cards/AlertCard'
import { ACCOMMODATION_DATA, CAPACITY_TREND } from '../data/accommodation'
import { getAlertLevel } from '../utils/thresholds'
import { Building2 } from 'lucide-react'

/**
 * Accommodation — Module 2: Công suất lưu trú
 */
function Accommodation() {
  const overloaded = ACCOMMODATION_DATA.filter((d) => d.capacity >= 85)

  return (
    <div className="space-y-6">
      {/* Cảnh báo khu vực quá tải */}
      {overloaded.map((d) => (
        <AlertCard
          key={d.district}
          type={d.capacity >= 95 ? 'critical' : 'warning'}
          title={`${d.district}: ${d.capacity}% công suất`}
          message={d.capacity >= 95 ? 'Vượt ngưỡng 95% — cần liên hệ điều phối ngay' : 'Tiếp cận ngưỡng cảnh báo 85%'}
          dismissible
        />
      ))}

      {/* Gauge charts theo khu vực */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-6">Tỷ lệ lấp đầy theo khu vực</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {ACCOMMODATION_DATA.map((d) => (
            <GaugeChart
              key={d.district}
              value={d.capacity}
              label={d.district}
              size={140}
            />
          ))}
        </div>

        {/* Chú thích */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Bình thường (&lt;85%)</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> Cảnh báo (85-94%)</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Nguy hiểm (≥95%)</span>
        </div>
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Chi tiết theo khu vực</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-2 font-medium">Khu vực</th>
                <th className="pb-2 font-medium text-right">Tổng phòng</th>
                <th className="pb-2 font-medium text-right">Khách sạn 3-5★</th>
                <th className="pb-2 font-medium text-right">Homestay</th>
                <th className="pb-2 font-medium text-right">Nhà nghỉ</th>
                <th className="pb-2 font-medium text-right">Công suất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ACCOMMODATION_DATA.map((d) => {
                const level = getAlertLevel(d.capacity, 'accommodation')
                const color = level === 'critical' ? 'text-red-600 font-bold' : level === 'warning' ? 'text-yellow-600 font-bold' : 'text-green-600'
                return (
                  <tr key={d.district} className="hover:bg-gray-50">
                    <td className="py-2.5 font-medium">{d.district}</td>
                    <td className="py-2.5 text-right">{d.totalRooms.toLocaleString('vi-VN')}</td>
                    <td className="py-2.5 text-right">{d.hotels3to5star}</td>
                    <td className="py-2.5 text-right">{d.homestay}</td>
                    <td className="py-2.5 text-right">{d.guesthouse}</td>
                    <td className={`py-2.5 text-right ${color}`}>{d.capacity}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Xu hướng công suất theo tháng */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Xu hướng công suất toàn thành phố — 2025</h3>
        <LineChart
          data={CAPACITY_TREND}
          xKey="month"
          lines={[{ key: 'Toàn thành phố', name: 'Công suất TB (%)', color: '#2E86C1' }]}
          height={250}
          formatter={(v) => `${v}%`}
        />
      </div>
    </div>
  )
}

export default Accommodation
