import { useState, useMemo } from 'react'
import KPICard from '../components/Cards/KPICard'
import AlertCard from '../components/Cards/AlertCard'
import PieChart from '../components/Charts/PieChart'
import BarChart from '../components/Charts/BarChart'
import Button from '../components/common/Button'
import Select from '../components/common/Select'
import {
  SENTIMENT_DISTRIBUTION, TOPIC_DISTRIBUTION,
  FEEDBACK_TREND, TOPIC_SENTIMENT_DATA,
  RECENT_FEEDBACKS, FEEDBACK_STATS, TOPICS,
} from '../data/feedback'
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, Send, Filter } from 'lucide-react'

// Badge màu theo sentiment
const BADGE = {
  positive: { cls: 'bg-green-100 text-green-700 border-green-200', label: 'Tích cực' },
  neutral:  { cls: 'bg-gray-100  text-gray-600  border-gray-200',  label: 'Trung lập' },
  negative: { cls: 'bg-red-100   text-red-700   border-red-200',   label: 'Tiêu cực' },
}

const TOPIC_OPTIONS = [{ value: '', label: 'Tất cả chủ đề' }, ...TOPICS.map((t) => ({ value: t, label: t }))]
const SENT_OPTIONS  = [
  { value: '',         label: 'Tất cả cảm xúc' },
  { value: 'positive', label: 'Tích cực' },
  { value: 'neutral',  label: 'Trung lập' },
  { value: 'negative', label: 'Tiêu cực' },
]

// Tab biểu đồ
const CHART_TABS = [
  { id: 'trend',    label: 'Xu hướng 30 ngày' },
  { id: 'topic',    label: 'Theo chủ đề' },
  { id: 'sentiment', label: 'Cảm xúc' },
]

/**
 * Feedback — Module 3: Phản ánh du khách
 * Bao gồm: KPI, biểu đồ (3 tab), bảng phản ánh có lọc, form gửi phản ánh
 */
function Feedback() {
  // Tab biểu đồ
  const [chartTab, setChartTab] = useState('trend')

  // Bộ lọc bảng
  const [filterTopic, setFilterTopic]   = useState('')
  const [filterSent,  setFilterSent]    = useState('')
  const [searchText,  setSearchText]    = useState('')

  // Form gửi phản ánh
  const [form, setForm]           = useState({ topic: 'Dịch vụ', content: '', location: '' })
  const [submitted, setSubmitted] = useState(false)

  // Lọc danh sách phản ánh
  const filtered = useMemo(() => {
    return RECENT_FEEDBACKS.filter((fb) => {
      if (filterTopic && fb.topic !== filterTopic) return false
      if (filterSent  && fb.sentiment !== filterSent)   return false
      if (searchText  && !fb.content.toLowerCase().includes(searchText.toLowerCase()) &&
                         !fb.location.toLowerCase().includes(searchText.toLowerCase())) return false
      return true
    })
  }, [filterTopic, filterSent, searchText])

  // Kiểm tra spike tiêu cực (> 25% trong 3 ngày liên tiếp)
  const spikeAlert = FEEDBACK_TREND.slice(-5).filter((d) => d.negPct > 25).length >= 2

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.content.trim()) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ topic: 'Dịch vụ', content: '', location: '' })
  }

  return (
    <div className="space-y-5">
      {/* Cảnh báo spike tiêu cực */}
      {spikeAlert && (
        <AlertCard
          type="warning"
          title="Xu hướng phản ánh tiêu cực tăng bất thường"
          message="Phát hiện >25% phản ánh tiêu cực trong nhiều ngày liên tiếp — Kiểm tra chất lượng dịch vụ tại Phố Cổ & Văn Miếu"
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Tổng phản ánh (tháng)" value={FEEDBACK_STATS.total.toLocaleString('vi-VN')} change={5.2}  icon={MessageSquare} color="blue" />
        <KPICard title="Tích cực"  value={FEEDBACK_STATS.positive.toLocaleString('vi-VN')} change={3.1}  icon={ThumbsUp}   color="green"  subtitle={`${Math.round(FEEDBACK_STATS.positive/FEEDBACK_STATS.total*100)}%`} />
        <KPICard title="Trung lập" value={FEEDBACK_STATS.neutral.toLocaleString('vi-VN')}  change={-1.2} icon={Minus}      color="yellow" subtitle={`${Math.round(FEEDBACK_STATS.neutral/FEEDBACK_STATS.total*100)}%`} />
        <KPICard title="Tiêu cực"  value={FEEDBACK_STATS.negative.toLocaleString('vi-VN')} change={-2.4} icon={ThumbsDown} color="red"    subtitle={`${Math.round(FEEDBACK_STATS.negative/FEEDBACK_STATS.total*100)}%`} />
      </div>

      {/* Biểu đồ — 3 tab */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        {/* Tab switcher */}
        <div className="flex gap-1 mb-5 border-b border-gray-200">
          {CHART_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setChartTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                chartTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={chartTab === tab.id ? { borderColor: '#2E86C1', color: '#2E86C1' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Xu hướng 30 ngày */}
        {chartTab === 'trend' && (
          <>
            <p className="text-xs text-gray-400 mb-3">Spike tiêu cực ngày 22–24/3 do sự cố tắc đường khu Hoàn Kiếm</p>
            <BarChart
              data={FEEDBACK_TREND}
              xKey="ngay"
              bars={[
                { key: 'Tích cực',  name: 'Tích cực',  color: '#27AE60' },
                { key: 'Trung lập', name: 'Trung lập', color: '#F39C12' },
                { key: 'Tiêu cực',  name: 'Tiêu cực',  color: '#E74C3C' },
              ]}
              stacked
              height={260}
            />
          </>
        )}

        {/* Phân tích theo chủ đề × sentiment */}
        {chartTab === 'topic' && (
          <BarChart
            data={TOPIC_SENTIMENT_DATA}
            xKey="topic"
            bars={[
              { key: 'Tích cực',  name: 'Tích cực',  color: '#27AE60' },
              { key: 'Trung lập', name: 'Trung lập', color: '#F39C12' },
              { key: 'Tiêu cực',  name: 'Tiêu cực',  color: '#E74C3C' },
            ]}
            stacked
            height={260}
          />
        )}

        {/* Pie chart cảm xúc + chủ đề */}
        {chartTab === 'sentiment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 text-center">Theo cảm xúc</p>
              <PieChart data={SENTIMENT_DISTRIBUTION} colors={['#27AE60', '#F39C12', '#E74C3C']} donut height={220} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 text-center">Theo chủ đề</p>
              <PieChart data={TOPIC_DISTRIBUTION} height={220} />
            </div>
          </div>
        )}
      </div>

      {/* Bảng phản ánh + Form */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Bảng phản ánh — chiếm 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800">
              Danh sách phản ánh
              <span className="ml-2 text-sm font-normal text-gray-400">({filtered.length} kết quả)</span>
            </h3>
            {/* Bộ lọc */}
            <div className="flex flex-wrap gap-2 items-end">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-36"
              />
              <Select value={filterTopic} onChange={setFilterTopic} options={TOPIC_OPTIONS} />
              <Select value={filterSent}  onChange={setFilterSent}  options={SENT_OPTIONS}  />
            </div>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Không có kết quả phù hợp</p>
            ) : filtered.map((fb) => {
              const b = BADGE[fb.sentiment]
              return (
                <div key={fb.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium border ${b.cls}`}>
                        {b.label}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{fb.topic}</span>
                      <span className="text-xs text-gray-400">— {fb.location}</span>
                      <span className="text-xs text-gray-300 ml-auto">{fb.date} {fb.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{fb.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form gửi phản ánh — 1/3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Tiếp nhận phản ánh mới</h3>

          {submitted && (
            <AlertCard type="success" title="Tiếp nhận thành công!" message="Phản ánh đã được ghi nhận và sẽ được xử lý trong vòng 24 giờ." />
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Chủ đề *</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Địa điểm</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Vd: Hồ Hoàn Kiếm, Phố Cổ..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Nội dung phản ánh *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={5}
                placeholder="Mô tả chi tiết vấn đề hoặc góp ý của bạn..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.content.length}/500 ký tự</p>
            </div>

            <Button type="submit" icon={Send} className="w-full justify-center" disabled={!form.content.trim()}>
              Gửi phản ánh
            </Button>
          </form>

          {/* Thống kê nhanh hôm nay */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Hôm nay</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-base font-bold text-blue-600">{FEEDBACK_STATS.todayTotal}</p>
                <p className="text-xs text-gray-500">Tổng</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-base font-bold text-green-600">{Math.round(FEEDBACK_STATS.todayTotal * 0.6)}</p>
                <p className="text-xs text-gray-500">Tích cực</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <p className="text-base font-bold text-red-600">{Math.round(FEEDBACK_STATS.todayTotal * 0.176)}</p>
                <p className="text-xs text-gray-500">Tiêu cực</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
