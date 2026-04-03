import { useState } from 'react'
import Button from '../components/common/Button'
import AlertCard from '../components/Cards/AlertCard'
import { exportWeeklyReport, exportMonthlyReport } from '../utils/reportGenerator'
import { VISITOR_KPI, VISITOR_DATA_2026, VISITOR_DATA_2025 } from '../data/visitors'
import { ACCOMMODATION_DATA } from '../data/accommodation'
import { FEEDBACK_STATS } from '../data/feedback'
import { formatVisitors } from '../utils/formatters'
import { useAuth } from '../context/AuthContext'
import {
  FileText, Download, Calendar, CheckCircle,
  Clock, BarChart2, MessageSquare, Building2, Lock,
} from 'lucide-react'

// Tính công suất TB
const avgOccupancy = Math.round(
  ACCOMMODATION_DATA.reduce((s, d) => s + d.capacity, 0) / ACCOMMODATION_DATA.length
)

// Dữ liệu các tuần gần đây để chọn
const WEEK_OPTIONS = [
  { value: 'w13', label: 'Tuần 14 (31/3 – 6/4/2026)',  visitors: Math.round(VISITOR_KPI.totalVisitors / 52 * 1.1) },
  { value: 'w12', label: 'Tuần 13 (24/3 – 30/3/2026)', visitors: Math.round(VISITOR_KPI.totalVisitors / 52 * 0.95) },
  { value: 'w11', label: 'Tuần 12 (17/3 – 23/3/2026)', visitors: Math.round(VISITOR_KPI.totalVisitors / 52 * 1.0) },
]

// Dữ liệu các tháng — chỉ tháng đã hoàn thành (T1–T3/2026)
const MONTH_OPTIONS = [
  { value: 'm3', label: `Tháng 3/${VISITOR_KPI.year}`, monthIndex: 2 },
  { value: 'm2', label: `Tháng 2/${VISITOR_KPI.year}`, monthIndex: 1 },
  { value: 'm1', label: `Tháng 1/${VISITOR_KPI.year}`, monthIndex: 0 },
]

/**
 * PreviewPanel — Hiển thị preview nội dung sẽ có trong báo cáo
 */
function PreviewPanel({ type, weekOption, monthOption }) {
  const isWeekly = type === 'weekly'
  const monthData = isWeekly ? null : VISITOR_DATA_2026[monthOption?.monthIndex ?? 2]
  const weekVisitors = weekOption?.visitors ?? Math.round(VISITOR_KPI.totalVisitors / 52)

  const sections = isWeekly
    ? ['I. Chỉ số tổng hợp tuần (KPI)', 'II. Cảnh báo & Sự cố trong tuần', 'III. Nhận xét & Kiến nghị tự động']
    : ['I. Chỉ số tổng hợp tháng (so với tháng trước)', 'II. Công suất lưu trú theo khu vực', 'III. Phân tích phản ánh du khách', 'IV. Kiến nghị tháng tới']

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={16} className="text-gray-400" />
        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
          Xem trước nội dung
        </span>
      </div>

      {/* Giả lập layout trang A4 */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
        {/* Header giả lập */}
        <div className="h-8 flex items-center justify-center text-xs font-bold text-white" style={{ background: '#1B4F72' }}>
          SỞ DU LỊCH HÀ NỘI — {isWeekly ? 'BÁO CÁO TUẦN' : 'BÁO CÁO THÁNG'}
        </div>

        <div className="p-3 space-y-2">
          {/* KPI preview */}
          <div className="grid grid-cols-2 gap-2">
            {isWeekly ? (
              <>
                <div className="bg-blue-50 rounded p-2 text-center">
                  <p className="text-xs font-bold text-blue-700">{formatVisitors(weekVisitors)}</p>
                  <p className="text-xs text-gray-500">Tổng lượt khách</p>
                </div>
                <div className="bg-blue-50 rounded p-2 text-center">
                  <p className="text-xs font-bold text-blue-700">{avgOccupancy}%</p>
                  <p className="text-xs text-gray-500">Công suất TB</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 rounded p-2 text-center">
                  <p className="text-xs font-bold text-blue-700">{formatVisitors(monthData?.['Tổng'] ?? 0)}</p>
                  <p className="text-xs text-gray-500">Tổng lượt khách</p>
                </div>
                <div className="bg-blue-50 rounded p-2 text-center">
                  <p className="text-xs font-bold text-blue-700">+{VISITOR_KPI.growthRate}%</p>
                  <p className="text-xs text-gray-500">Tăng trưởng</p>
                </div>
              </>
            )}
          </div>

          {/* Danh sách sections */}
          <div className="space-y-1">
            {sections.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-xs text-gray-600">{s}</span>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-300 pt-1 border-t border-gray-100">
            Tổng ~{isWeekly ? '1' : '2'} trang A4
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Reports — Module 6: Xuất báo cáo tuần/tháng
 */
function Reports() {
  const { can } = useAuth()
  const canExport = can('canExportReport')
  const [loadingType, setLoadingType] = useState(null)
  const [selectedWeek,  setSelectedWeek]  = useState(WEEK_OPTIONS[0])
  const [selectedMonth, setSelectedMonth] = useState(MONTH_OPTIONS[0])
  const [exportHistory, setExportHistory] = useState([
    { name: 'Báo cáo tuần 13/2026', date: '01/04/2026', type: 'Tuần',  size: '156 KB' },
    { name: 'Báo cáo tháng 3/2026', date: '31/03/2026', type: 'Tháng', size: '284 KB' },
    { name: 'Báo cáo tuần 12/2026', date: '24/03/2026', type: 'Tuần',  size: '149 KB' },
    { name: 'Báo cáo tháng 2/2026', date: '28/02/2026', type: 'Tháng', size: '271 KB' },
  ])
  const [lastExported, setLastExported] = useState(null)

  const doExport = async (type) => {
    setLoadingType(type)
    await new Promise((r) => setTimeout(r, 700))

    if (type === 'weekly') {
      const w = selectedWeek
      exportWeeklyReport({
        weekLabel:             w.label,
        totalVisitors:         w.visitors,
        domesticVisitors:      Math.round(w.visitors * 0.89),
        internationalVisitors: Math.round(w.visitors * 0.11),
        avgOccupancy,
        totalFeedbacks:        Math.round(FEEDBACK_STATS.avgPerDay * 7),
        positivePct:           60,
        negativePct:           FEEDBACK_STATS.todayNegPct,
        visitorChange:         5.2,
        occupancyChange:       2,
      })
      const entry = {
        name: `${w.label.split('(')[0].trim()}`,
        date: new Date().toLocaleDateString('vi-VN'),
        type: 'Tuần',
        size: '~158 KB',
      }
      setExportHistory((prev) => [entry, ...prev])
      setLastExported('weekly')
    } else {
      const m = selectedMonth
      const mData = VISITOR_DATA_2026[m.monthIndex]
      const distRows = ACCOMMODATION_DATA.map((d) => [
        d.district, `${d.capacity}%`,
        d.totalRooms.toLocaleString('vi-VN'),
        d.capacity >= 95 ? 'Nguy hiểm' : d.capacity >= 85 ? 'Cảnh báo' : 'Bình thường',
      ])
      exportMonthlyReport(
        {
          monthLabel:        m.label,
          totalVisitors:     mData?.['Tổng'] ?? 0,
          prevTotalVisitors: Math.round((mData?.['Tổng'] ?? 0) * 0.88),
          avgOccupancy,
          prevOccupancy:     avgOccupancy - 3,
          growthRate:        `+${VISITOR_KPI.growthRate}%`,
          totalFeedbacks:    FEEDBACK_STATS.total,
          prevFeedbacks:     Math.round(FEEDBACK_STATS.total * 0.92),
        },
        distRows
      )
      const entry = {
        name: m.label,
        date: new Date().toLocaleDateString('vi-VN'),
        type: 'Tháng',
        size: '~290 KB',
      }
      setExportHistory((prev) => [entry, ...prev])
      setLastExported('monthly')
    }

    setLoadingType(null)
    setTimeout(() => setLastExported(null), 4000)
  }

  return (
    <div className="space-y-5">
      {/* Thông báo không có quyền */}
      {!canExport && (
        <div className="flex items-start gap-3 px-4 py-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
          <Lock size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Bạn không có quyền xuất báo cáo</p>
            <p className="text-yellow-700 mt-0.5 text-xs">
              Chức năng xuất PDF chỉ dành cho <span className="font-medium">Quản trị viên</span>. Bạn vẫn có thể xem thống kê và lịch sử bên dưới.
            </p>
          </div>
        </div>
      )}

      {/* Thông báo xuất thành công */}
      {lastExported && (
        <AlertCard
          type="success"
          title={`Xuất ${lastExported === 'weekly' ? 'báo cáo tuần' : 'báo cáo tháng'} thành công!`}
          message="File PDF đã được tải xuống máy tính của bạn."
        />
      )}

      {/* Tổng quan thống kê */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng lượt khách 2025', value: formatVisitors(VISITOR_KPI.totalVisitors), icon: BarChart2,    color: 'text-blue-600',   bg: 'bg-blue-50' },
          { label: 'Công suất lưu trú TB', value: `${avgOccupancy}%`,                        icon: Building2,   color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Phản ánh tháng này',   value: FEEDBACK_STATS.total.toLocaleString(),     icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Báo cáo đã xuất',      value: exportHistory.length,                      icon: FileText,    color: 'text-green-600',  bg: 'bg-green-50' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className={`rounded-xl border border-gray-200 p-4 flex items-center gap-3 ${s.bg}`}>
              <Icon size={20} className={s.color} />
              <div>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Xuất báo cáo — 2 cột */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Báo cáo tuần */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-lg"><Calendar size={20} className="text-blue-600" /></div>
            <div>
              <h3 className="font-semibold text-gray-800">Báo cáo tuần</h3>
              <p className="text-xs text-gray-500">Tóm tắt hoạt động 7 ngày (~1 trang A4)</p>
            </div>
          </div>

          {/* Chọn tuần */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 block mb-1">Chọn kỳ báo cáo</label>
            <select
              value={selectedWeek.value}
              onChange={(e) => setSelectedWeek(WEEK_OPTIONS.find((w) => w.value === e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {WEEK_OPTIONS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>

          {/* Nội dung bao gồm */}
          <ul className="text-xs text-gray-500 space-y-1 mb-4">
            {['KPI tổng hợp tuần (lượt khách, lưu trú, phản ánh)', 'Bảng cảnh báo điểm đến & khu vực', 'Nhận xét tự động và kiến nghị'].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <CheckCircle size={11} className="text-green-500 flex-shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>

          <PreviewPanel type="weekly" weekOption={selectedWeek} />

          <Button
            icon={canExport ? Download : Lock}
            loading={loadingType === 'weekly'}
            onClick={() => doExport('weekly')}
            disabled={!canExport}
            className="w-full justify-center mt-4"
          >
            {canExport ? 'Xuất báo cáo tuần (PDF)' : 'Không có quyền xuất'}
          </Button>
        </div>

        {/* Báo cáo tháng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-green-50 rounded-lg"><FileText size={20} className="text-green-600" /></div>
            <div>
              <h3 className="font-semibold text-gray-800">Báo cáo tháng</h3>
              <p className="text-xs text-gray-500">Phân tích chi tiết 30 ngày (~2 trang A4)</p>
            </div>
          </div>

          {/* Chọn tháng */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 block mb-1">Chọn kỳ báo cáo</label>
            <select
              value={selectedMonth.value}
              onChange={(e) => setSelectedMonth(MONTH_OPTIONS.find((m) => m.value === e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {MONTH_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          <ul className="text-xs text-gray-500 space-y-1 mb-4">
            {['So sánh cùng kỳ tháng trước (KPI đầy đủ)', 'Công suất lưu trú chi tiết 6 khu vực', 'Phân tích phản ánh theo chủ đề', 'Kiến nghị điều hành tháng tới'].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <CheckCircle size={11} className="text-green-500 flex-shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>

          <PreviewPanel type="monthly" monthOption={selectedMonth} />

          <Button
            icon={canExport ? Download : Lock}
            variant="secondary"
            loading={loadingType === 'monthly'}
            onClick={() => doExport('monthly')}
            disabled={!canExport}
            className="w-full justify-center mt-4"
          >
            {canExport ? 'Xuất báo cáo tháng (PDF)' : 'Không có quyền xuất'}
          </Button>
        </div>
      </div>

      {/* Lịch sử xuất báo cáo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-gray-400" />
          <h3 className="font-semibold text-gray-800">Lịch sử xuất báo cáo</h3>
          <span className="ml-auto text-xs text-gray-400">{exportHistory.length} file</span>
        </div>
        <div className="space-y-2">
          {exportHistory.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FileText size={15} className={r.type === 'Tháng' ? 'text-green-500' : 'text-blue-500'} />
              <span className="flex-1 text-sm text-gray-700 font-medium">{r.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === 'Tháng' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {r.type}
              </span>
              <span className="text-xs text-gray-400 w-16 text-right">{r.size}</span>
              <span className="text-xs text-gray-400 w-24 text-right">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports
