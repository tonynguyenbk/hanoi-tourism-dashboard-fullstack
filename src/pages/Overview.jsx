import { Users, Building2, MessageSquare, Map, TrendingUp, Globe } from 'lucide-react'
import KPICard from '../components/Cards/KPICard'
import AlertCard from '../components/Cards/AlertCard'
import LineChart from '../components/Charts/LineChart'
import BarChart from '../components/Charts/BarChart'
import { VISITOR_KPI, VISITOR_DATA_2025, VISITOR_COMPARISON } from '../data/visitors'
import { ACCOMMODATION_DATA } from '../data/accommodation'
import { RECENT_FEEDBACKS } from '../data/feedback'
import { getUpcomingEvents } from '../data/events'
import { formatVisitors, formatDate } from '../utils/formatters'

/**
 * Overview — Trang tổng quan: KPI + mini charts tóm tắt tất cả modules
 */
function Overview() {
  const avgOccupancy = Math.round(
    ACCOMMODATION_DATA.reduce((s, d) => s + d.capacity, 0) / ACCOMMODATION_DATA.length
  )
  const overloaded = ACCOMMODATION_DATA.filter((d) => d.capacity >= 85)
  const upcomingEvents = getUpcomingEvents(30) // sự kiện trong 30 ngày tới

  // Tỷ lệ feedback tiêu cực hôm nay
  const negativePct = 17.6

  return (
    <div className="space-y-5">
      {/* === Cảnh báo nổi bật === */}
      {overloaded.length > 0 && (
        <div className="space-y-2">
          {overloaded.map((d) => (
            <AlertCard
              key={d.district}
              type={d.capacity >= 95 ? 'critical' : 'warning'}
              title={`Công suất lưu trú ${d.district}: ${d.capacity}%`}
              message={
                d.capacity >= 95
                  ? 'Vượt ngưỡng nguy hiểm 95% — Liên hệ điều phối ngay'
                  : 'Tiếp cận ngưỡng cảnh báo 85%'
              }
              dismissible
            />
          ))}
        </div>
      )}

      {/* === KPI Cards (6 chỉ số) === */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <KPICard
          title="Tổng lượt khách năm 2025"
          value={formatVisitors(VISITOR_KPI.totalVisitors)}
          change={VISITOR_KPI.growthRate}
          index={0}
          icon={Users}
          color="blue"
          subtitle={`Nội địa: ${formatVisitors(VISITOR_KPI.domesticVisitors)}`}
        />
        <KPICard
          title="Khách quốc tế"
          value={formatVisitors(VISITOR_KPI.internationalVisitors)}
          change={15.2}
          index={1}
          icon={Globe}
          color="green"
          subtitle="6 quốc gia hàng đầu"
        />
        <KPICard
          title="Tăng trưởng tổng"
          value={`+${VISITOR_KPI.growthRate}%`}
          change={VISITOR_KPI.growthRate}
          index={2}
          icon={TrendingUp}
          color="green"
          subtitle="So với năm 2024"
        />
        <KPICard
          title="Công suất lưu trú TB"
          value={`${avgOccupancy}%`}
          change={4.1}
          index={3}
          icon={Building2}
          color={avgOccupancy >= 85 ? 'red' : avgOccupancy >= 70 ? 'yellow' : 'blue'}
          subtitle={`${overloaded.length} khu vực cảnh báo`}
        />
        <KPICard
          title="Phản ánh hôm nay"
          value="68"
          change={-5.3}
          index={4}
          icon={MessageSquare}
          color={negativePct > 25 ? 'red' : 'yellow'}
          subtitle={`${negativePct}% tiêu cực`}
        />
        <KPICard
          title="Điểm đến đông nhất"
          value="Phố đi bộ HG"
          index={5}
          icon={Map}
          color="blue"
          subtitle="97% sức chứa — Quá tải"
        />
      </div>

      {/* === Biểu đồ chính === */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Lượt khách 12 tháng — chiếm 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-1">Lượt khách theo tháng — 2025</h3>
          <p className="text-xs text-gray-400 mb-4">Cao điểm: T2 (Tết), T10-T12 (Thu đông)</p>
          <LineChart
            data={VISITOR_DATA_2025}
            xKey="month"
            lines={[
              { key: 'Nội địa', name: 'Khách nội địa', color: '#2E86C1' },
              { key: 'Quốc tế', name: 'Khách quốc tế', color: '#27AE60' },
            ]}
            height={240}
            formatter={(v) => formatVisitors(v)}
          />
        </div>

        {/* Công suất lưu trú theo khu vực — 1/3 */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Công suất theo khu vực</h3>
          <div className="space-y-3">
            {ACCOMMODATION_DATA.map((d) => {
              const isRed    = d.capacity >= 95
              const isYellow = d.capacity >= 85 && !isRed
              const barColor = isRed ? 'bg-red-500' : isYellow ? 'bg-yellow-400' : 'bg-green-500'
              const txtColor = isRed ? 'text-red-600' : isYellow ? 'text-yellow-600' : 'text-green-600'
              return (
                <div key={d.district}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{d.district}</span>
                    <span className={`font-bold ${txtColor}`}>{d.capacity}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${d.capacity}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          {/* Chú thích màu */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" /> &lt;85%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> 85–94%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> ≥95%</span>
          </div>
        </div>
      </div>

      {/* === So sánh + Sự kiện sắp tới === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* So sánh cùng kỳ */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">So sánh cùng kỳ 2024–2025</h3>
          <BarChart
            data={VISITOR_COMPARISON}
            xKey="month"
            bars={[
              { key: 'Năm nay',   name: '2025', color: '#2E86C1' },
              { key: 'Năm trước', name: '2024', color: '#BDC3C7' },
            ]}
            height={220}
            formatter={(v) => formatVisitors(v)}
          />
        </div>

        {/* Sự kiện sắp tới + Phản ánh gần đây */}
        <div className="space-y-4">
          {/* Sự kiện */}
          {upcomingEvents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Sự kiện trong 30 ngày tới</h3>
              <div className="space-y-2">
                {upcomingEvents.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" style={{ backgroundColor: '#2E86C1' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{ev.name}</p>
                      <p className="text-xs text-gray-500">{formatDate(ev.date)}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">~{(ev.expectedVisitors / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phản ánh gần đây */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-1">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Phản ánh gần đây</h3>
            <div className="space-y-2">
              {RECENT_FEEDBACKS.slice(0, 4).map((fb) => {
                const badge = { positive: 'bg-green-100 text-green-700', neutral: 'bg-gray-100 text-gray-600', negative: 'bg-red-100 text-red-700' }
                const label = { positive: 'Tích cực', neutral: 'Trung lập', negative: 'Tiêu cực' }
                return (
                  <div key={fb.id} className="flex gap-2 items-start">
                    <span className={`px-1.5 py-0.5 text-xs rounded font-medium flex-shrink-0 ${badge[fb.sentiment]}`}>
                      {label[fb.sentiment]}
                    </span>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">{fb.content}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
