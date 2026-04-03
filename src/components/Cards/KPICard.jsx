import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: '#2E86C1', border: '#BFDBFE', ring: 'hover:ring-blue-200'   },
  green:  { bg: 'bg-green-50',  icon: '#16a34a', border: '#BBF7D0', ring: 'hover:ring-green-200'  },
  yellow: { bg: 'bg-yellow-50', icon: '#d97706', border: '#FDE68A', ring: 'hover:ring-yellow-200' },
  red:    { bg: 'bg-red-50',    icon: '#dc2626', border: '#FECACA', ring: 'hover:ring-red-200'    },
}

/**
 * KPICard — Chỉ số KPI với animation hover
 * Props:
 *   title    — Tên chỉ số
 *   value    — Giá trị hiển thị (string)
 *   change   — % thay đổi (số, có thể âm)
 *   icon     — Component icon từ lucide-react
 *   color    — 'blue' | 'green' | 'yellow' | 'red'
 *   subtitle — Dòng phụ nhỏ
 *   index    — Thứ tự (dùng cho stagger animation delay)
 */
function KPICard({ title, value, change, icon: Icon, color = 'blue', subtitle, index = 0 }) {
  const c = colorMap[color] || colorMap.blue
  const isPositive = change > 0
  const isNeutral  = change === 0 || change === undefined

  return (
    <div
      className={`kpi-card bg-white rounded-xl border p-4 md:p-5 cursor-default ring-1 ring-transparent ${c.ring} animate-fade-in`}
      style={{
        borderColor: c.border,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-xl md:text-2xl font-bold text-gray-800 truncate">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-400 truncate">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={`${c.bg} p-2.5 rounded-lg flex-shrink-0`}>
            <Icon size={20} style={{ color: c.icon }} />
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          {isNeutral ? (
            <Minus size={13} className="text-gray-400" />
          ) : isPositive ? (
            <TrendingUp size={13} className="text-green-500" />
          ) : (
            <TrendingDown size={13} className="text-red-500" />
          )}
          <span className={`text-xs font-semibold ${isNeutral ? 'text-gray-400' : isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-gray-400">so kỳ trước</span>
        </div>
      )}
    </div>
  )
}

export default KPICard
