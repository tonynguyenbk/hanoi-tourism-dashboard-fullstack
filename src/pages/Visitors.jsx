import { useState, useMemo } from 'react'
import KPICard from '../components/Cards/KPICard'
import LineChart from '../components/Charts/LineChart'
import BarChart from '../components/Charts/BarChart'
import PieChart from '../components/Charts/PieChart'
import Select from '../components/common/Select'
import { VISITOR_DATA_2026, VISITOR_DATA_2025, VISITOR_KPI, VISITOR_COMPARISON, TOP_SOURCES } from '../data/visitors'
import { generateWeeklyData, generateDailyData, CURRENT_YEAR } from '../data/generators'
import { formatVisitors } from '../utils/formatters'
import { Users, Globe, TrendingUp, UserCheck } from 'lucide-react'

// Dữ liệu tuần và ngày (sinh một lần, ổn định)
const WEEKLY_DATA = generateWeeklyData(CURRENT_YEAR)
const DAILY_DATA  = generateDailyData()

const VIEW_OPTIONS = [
  { value: 'monthly', label: 'Theo tháng' },
  { value: 'weekly',  label: 'Theo tuần' },
  { value: 'daily',   label: '30 ngày gần nhất' },
]

const YEAR_OPTIONS = [
  { value: CURRENT_YEAR,     label: `${CURRENT_YEAR} (T1–T3 thực tế)` },
  { value: CURRENT_YEAR - 1, label: String(CURRENT_YEAR - 1) },
]

/**
 * Visitors — Module 1: Theo dõi lượt khách
 * Bao gồm: KPI cards, biểu đồ theo kỳ, so sánh năm trước, top nguồn khách
 */
function Visitors() {
  const [viewType, setViewType]     = useState('monthly')
  const [selectedYear, setYear]     = useState(CURRENT_YEAR)
  const [chartType, setChartType]   = useState('bar') // 'bar' | 'line'

  // Chọn dataset theo viewType và năm
  const chartData = useMemo(() => {
    if (viewType === 'daily')   return DAILY_DATA
    if (viewType === 'weekly')  return WEEKLY_DATA
    return selectedYear === CURRENT_YEAR ? VISITOR_DATA_2026 : VISITOR_DATA_2025
  }, [viewType, selectedYear])

  // Key trục X tương ứng
  const xKey = viewType === 'daily' ? 'ngay' : viewType === 'weekly' ? 'week' : 'month'

  // Tổng từ dữ liệu đang hiển thị
  const totalShown = chartData.reduce((s, d) => s + d['Tổng'], 0)
  const domShown   = chartData.reduce((s, d) => s + d['Nội địa'], 0)
  const intShown   = chartData.reduce((s, d) => s + d['Quốc tế'], 0)

  const chartLines = [
    { key: 'Nội địa', name: 'Khách nội địa', color: '#2E86C1' },
    { key: 'Quốc tế', name: 'Khách quốc tế', color: '#27AE60' },
  ]

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title={`Lượt khách Q1 ${VISITOR_KPI.year} (T1–T3)`}
          value={formatVisitors(VISITOR_KPI.totalVisitors)}
          change={VISITOR_KPI.growthRate}
          icon={Users}
          color="blue"
          subtitle={`Nội địa: ${formatVisitors(VISITOR_KPI.domesticVisitors)}`}
        />
        <KPICard
          title="Khách quốc tế Q1"
          value={formatVisitors(VISITOR_KPI.internationalVisitors)}
          change={15.2}
          icon={Globe}
          color="green"
          subtitle={`Q1 ${VISITOR_KPI.year}`}
        />
        <KPICard
          title={`Tăng trưởng so với Q1 ${VISITOR_KPI.year - 1}`}
          value={`+${VISITOR_KPI.growthRate}%`}
          change={VISITOR_KPI.growthRate}
          icon={TrendingUp}
          color="yellow"
        />
        <KPICard
          title="Lượt khách tháng 3"
          value={formatVisitors(VISITOR_DATA_2026[2]['Tổng'])}
          change={8.5}
          icon={UserCheck}
          color="blue"
          subtitle={`Tháng 3/${VISITOR_KPI.year}`}
        />
      </div>

      {/* Bộ lọc */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <h3 className="font-semibold text-gray-800 text-base">
            Biểu đồ lượt khách
            <span className="ml-2 text-sm font-normal text-gray-500">
              Tổng: {formatVisitors(totalShown)}
              {' '}({formatVisitors(domShown)} nội địa + {formatVisitors(intShown)} quốc tế)
            </span>
          </h3>
          <div className="flex flex-wrap items-end gap-3">
            <Select label="Kỳ xem" value={viewType} onChange={setViewType} options={VIEW_OPTIONS} />
            {viewType === 'monthly' && (
              <Select label="Năm" value={selectedYear} onChange={(v) => setYear(Number(v))} options={YEAR_OPTIONS} />
            )}
            {/* Toggle Bar / Line */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500">Loại biểu đồ</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                {['bar', 'line'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setChartType(t)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      chartType === t ? 'bg-primary-dark text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    style={chartType === t ? { backgroundColor: '#1B4F72' } : {}}
                  >
                    {t === 'bar' ? 'Cột' : 'Đường'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {chartType === 'bar' ? (
          <BarChart
            data={chartData}
            xKey={xKey}
            bars={chartLines}
            height={300}
            formatter={(v) => formatVisitors(v)}
          />
        ) : (
          <LineChart
            data={chartData}
            xKey={xKey}
            lines={chartLines}
            height={300}
            formatter={(v) => formatVisitors(v)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* So sánh cùng kỳ năm trước */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">So sánh cùng kỳ {VISITOR_KPI.year - 1}–{VISITOR_KPI.year}</h3>
          <LineChart
            data={VISITOR_COMPARISON}
            xKey="month"
            lines={[
              { key: 'Năm nay',   name: `Năm ${VISITOR_KPI.year}`,       color: '#2E86C1' },
              { key: 'Năm trước', name: `Năm ${VISITOR_KPI.year - 1}`,   color: '#BDC3C7' },
            ]}
            height={250}
            formatter={(v) => formatVisitors(v)}
          />
        </div>

        {/* Top nguồn khách quốc tế */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Top nguồn khách quốc tế</h3>
          <PieChart data={TOP_SOURCES} donut height={250} />
        </div>
      </div>

      {/* Bảng chi tiết theo tháng */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Số liệu chi tiết theo tháng — {VISITOR_KPI.year}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-left">
                <th className="pb-2 font-medium">Tháng</th>
                <th className="pb-2 font-medium text-right">Khách nội địa</th>
                <th className="pb-2 font-medium text-right">Khách quốc tế</th>
                <th className="pb-2 font-medium text-right">Tổng cộng</th>
                <th className="pb-2 font-medium text-right">So với {VISITOR_KPI.year - 1}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {VISITOR_DATA_2026.map((row, i) => {
                const prev = VISITOR_DATA_2025[i]['Tổng']
                const growth = (((row['Tổng'] - prev) / prev) * 100).toFixed(1)
                return (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-700">{row.month}</td>
                    <td className="py-2.5 text-right text-gray-600">{row['Nội địa'].toLocaleString('vi-VN')}</td>
                    <td className="py-2.5 text-right text-gray-600">{row['Quốc tế'].toLocaleString('vi-VN')}</td>
                    <td className="py-2.5 text-right font-semibold text-gray-800">{row['Tổng'].toLocaleString('vi-VN')}</td>
                    <td className={`py-2.5 text-right text-xs font-medium ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(growth) >= 0 ? '+' : ''}{growth}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 font-bold bg-gray-50">
                <td className="py-2.5">Q1 {VISITOR_KPI.year} (T1–T3)</td>
                <td className="py-2.5 text-right">{VISITOR_KPI.domesticVisitors.toLocaleString('vi-VN')}</td>
                <td className="py-2.5 text-right">{VISITOR_KPI.internationalVisitors.toLocaleString('vi-VN')}</td>
                <td className="py-2.5 text-right text-primary" style={{ color: '#2E86C1' }}>{VISITOR_KPI.totalVisitors.toLocaleString('vi-VN')}</td>
                <td className="py-2.5 text-right text-green-600">+{VISITOR_KPI.growthRate}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Visitors
