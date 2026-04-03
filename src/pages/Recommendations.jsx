import { useState, useMemo } from 'react'
import { getAllRecommendations } from '../utils/recommendations'
import { ACCOMMODATION_DATA } from '../data/accommodation'
import { HANOI_EVENTS } from '../data/events'
import { formatDate } from '../utils/formatters'
import {
  Lightbulb, Calendar, MapPin, Building2,
  MessageSquare, ChevronDown, ChevronUp,
  CheckCircle, AlertTriangle, AlertCircle, Info,
} from 'lucide-react'

// Mật độ điểm đến hiện tại
const CURRENT_DENSITY = {
  'hoan-kiem': 78, 'van-mieu': 55, 'lang-bac': 62, 'hoang-thanh': 45,
  'chua-mot-cot': 70, 'chua-tran-quoc': 58, 'pho-di-bo': 97,
  'bat-trang': 40, 'ho-tay': 50, 'nha-tho-lon': 88,
}

// Cấu hình giao diện theo loại cảnh báo
const TYPE_STYLE = {
  critical: {
    border: 'border-red-200',    bg: 'bg-red-50',
    title:  'text-red-800',      detail: 'text-red-700',
    badge:  'bg-red-100 text-red-700',
    icon: AlertCircle, iconColor: 'text-red-500',
    label: 'Khẩn cấp',
  },
  warning: {
    border: 'border-yellow-200', bg: 'bg-yellow-50',
    title:  'text-yellow-800',   detail: 'text-yellow-700',
    badge:  'bg-yellow-100 text-yellow-700',
    icon: AlertTriangle, iconColor: 'text-yellow-500',
    label: 'Cần xử lý',
  },
  info: {
    border: 'border-blue-200',   bg: 'bg-blue-50',
    title:  'text-blue-800',     detail: 'text-blue-700',
    badge:  'bg-blue-100 text-blue-700',
    icon: Info, iconColor: 'text-blue-500',
    label: 'Thông tin',
  },
}

// Cấu hình tab danh mục
const CATEGORIES = [
  { id: 'all',           label: 'Tất cả',          icon: Lightbulb },
  { id: 'destination',   label: 'Điểm đến',         icon: MapPin },
  { id: 'accommodation', label: 'Lưu trú',           icon: Building2 },
  { id: 'feedback',      label: 'Phản ánh',          icon: MessageSquare },
  { id: 'event',         label: 'Sự kiện',           icon: Calendar },
]

// Nhãn danh mục tiếng Việt
const CAT_LABEL = {
  destination:   'Điểm đến',
  accommodation: 'Lưu trú',
  feedback:      'Phản ánh',
  event:         'Sự kiện',
}

/**
 * Card gợi ý đơn lẻ — có thể mở rộng xem actions
 */
function RecCard({ rec, onMarkDone, done }) {
  const [expanded, setExpanded] = useState(rec.type === 'critical')
  const s = TYPE_STYLE[rec.type] || TYPE_STYLE.info
  const Icon = s.icon

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${done ? 'opacity-50' : ''} ${s.border} ${s.bg}`}>
      {/* Header card */}
      <div
        className="flex items-start gap-3 p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon size={18} className={`${s.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
            <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
              {CAT_LABEL[rec.category]}
            </span>
          </div>
          <p className={`font-semibold text-sm ${s.title}`}>{rec.title}</p>
          <p className={`text-xs mt-0.5 ${s.detail}`}>{rec.detail}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {done && <CheckCircle size={16} className="text-green-500" />}
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {/* Actions — hiện khi mở rộng */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/60 pt-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">Hành động đề xuất:</p>
          <ol className="space-y-1.5">
            {rec.actions.map((action, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-700">
                <span className={`w-4 h-4 rounded-full text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${s.iconColor.replace('text-', 'bg-')}`}
                      style={{ minWidth: 16 }}>
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
          {!done && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkDone(rec.id) }}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              <CheckCircle size={14} />
              Đánh dấu đã xử lý
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Recommendations — Module 5: Gợi ý điều tiết
 */
function Recommendations() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [doneIds, setDoneIds] = useState(new Set())

  const allRecs = useMemo(
    () => getAllRecommendations(CURRENT_DENSITY, ACCOMMODATION_DATA),
    []
  )

  // Lọc theo category
  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? allRecs
      : allRecs.filter((r) => r.category === activeCategory),
    [allRecs, activeCategory]
  )

  // Đếm theo category để hiển thị badge
  const countByCategory = useMemo(() => {
    const counts = { all: allRecs.length }
    allRecs.forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1 })
    return counts
  }, [allRecs])

  // Đếm theo loại để hiển thị summary
  const criticalCount = allRecs.filter((r) => r.type === 'critical').length
  const warningCount  = allRecs.filter((r) => r.type === 'warning').length
  const doneCount     = doneIds.size

  const markDone = (id) => setDoneIds((prev) => new Set([...prev, id]))

  // Tháng hiện tại để tính số ngày đến sự kiện
  const today = new Date()

  return (
    <div className="space-y-5">

      {/* Tổng quan nhanh */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng gợi ý',   value: allRecs.length, color: 'bg-blue-50 text-blue-700',    border: 'border-blue-200' },
          { label: 'Khẩn cấp',     value: criticalCount,  color: 'bg-red-50 text-red-700',      border: 'border-red-200' },
          { label: 'Cần xử lý',    value: warningCount,   color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-200' },
          { label: 'Đã xử lý',     value: doneCount,      color: 'bg-green-50 text-green-700',  border: 'border-green-200' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 text-center ${s.border} ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Panel chính: tabs + danh sách gợi ý */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs category */}
        <div className="flex overflow-x-auto border-b border-gray-200 px-4 pt-3 gap-1">
          {CATEGORIES.map(({ id, label, icon: CatIcon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === id
                  ? 'border-primary text-primary bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              style={activeCategory === id ? { borderColor: '#2E86C1', color: '#2E86C1' } : {}}
            >
              <CatIcon size={14} />
              {label}
              {countByCategory[id] > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeCategory === id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                style={activeCategory === id ? { backgroundColor: '#2E86C1' } : {}}>
                  {countByCategory[id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Danh sách gợi ý */}
        <div className="p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <CheckCircle size={32} className="mx-auto mb-2 text-green-400" />
              <p className="text-sm font-medium">Không có gợi ý cho danh mục này</p>
              <p className="text-xs mt-1">Tình hình ổn định!</p>
            </div>
          ) : (
            filtered.map((rec) => (
              <RecCard
                key={rec.id}
                rec={rec}
                done={doneIds.has(rec.id)}
                onMarkDone={markDone}
              />
            ))
          )}
        </div>
      </div>

      {/* Lịch sự kiện đầy đủ năm 2026 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-primary" style={{ color: '#2E86C1' }} />
          <h3 className="font-semibold text-gray-800">Lịch sự kiện du lịch Hà Nội 2026</h3>
        </div>
        <div className="space-y-2">
          {HANOI_EVENTS.map((event) => {
            const daysLeft = Math.ceil((new Date(event.date) - today) / 86400000)
            const isPast   = daysLeft < 0
            const isNear   = daysLeft >= 0 && daysLeft <= 30
            const typeBadge = {
              national: 'bg-red-100 text-red-700',
              cultural: 'bg-purple-100 text-purple-700',
              local:    'bg-green-100 text-green-700',
            }
            const typeLabel = { national: 'Quốc gia', cultural: 'Văn hóa', local: 'Địa phương' }

            return (
              <div
                key={event.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isNear ? 'bg-blue-50 border border-blue-200' :
                  isPast ? 'bg-gray-50 opacity-50' : 'bg-gray-50'
                }`}
              >
                {/* Ngày */}
                <div className="w-12 text-center flex-shrink-0">
                  <p className="text-xs font-bold text-gray-700">{new Date(event.date).getDate()}</p>
                  <p className="text-xs text-gray-500">
                    T{new Date(event.date).getMonth() + 1}
                  </p>
                </div>

                <div className="w-px h-8 bg-gray-200 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-sm text-gray-800">{event.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[event.type] || 'bg-gray-100 text-gray-600'}`}>
                      {typeLabel[event.type]}
                    </span>
                    {isNear && !isPast && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                        Còn {daysLeft} ngày
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(event.date)}
                    {event.endDate !== event.date ? ` — ${formatDate(event.endDate)}` : ''}
                    {' · '}Dự kiến ~{(event.expectedVisitors / 1000).toFixed(0)}K lượt khách
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
