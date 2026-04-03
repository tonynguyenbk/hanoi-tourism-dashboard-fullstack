import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from 'lucide-react'
import { useState } from 'react'

const styles = {
  warning:  { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: AlertTriangle, iconCls: 'text-yellow-500', text: 'text-yellow-800' },
  critical: { bg: 'bg-red-50',    border: 'border-red-300',    icon: AlertCircle,   iconCls: 'text-red-500',    text: 'text-red-800'    },
  info:     { bg: 'bg-blue-50',   border: 'border-blue-300',   icon: Info,          iconCls: 'text-blue-500',   text: 'text-blue-800'   },
  success:  { bg: 'bg-green-50',  border: 'border-green-300',  icon: CheckCircle,   iconCls: 'text-green-500',  text: 'text-green-800'  },
}

/**
 * AlertCard — Thông báo cảnh báo có thể đóng
 * Props:
 *   type       — 'warning' | 'critical' | 'info' | 'success'
 *   title      — Tiêu đề
 *   message    — Nội dung
 *   dismissible — true = hiện nút đóng
 *   action     — Text nút hành động
 *   onAction   — Callback nút hành động
 */
function AlertCard({ type = 'info', title, message, dismissible = false, action, onAction }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const s = styles[type] || styles.info
  const Icon = s.icon

  return (
    <div className={`alert-slide-in ${s.bg} border ${s.border} rounded-lg p-3.5 flex gap-3`}>
      <Icon size={18} className={`${s.iconCls} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {title && <p className={`font-semibold text-sm ${s.text}`}>{title}</p>}
        {message && <p className={`text-sm mt-0.5 ${s.text} opacity-85 leading-snug`}>{message}</p>}
        {action && (
          <button
            onClick={onAction}
            className={`mt-1.5 text-xs font-semibold underline underline-offset-2 ${s.text} hover:opacity-70 transition-opacity`}
          >
            {action}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className={`${s.text} opacity-50 hover:opacity-100 transition-opacity flex-shrink-0`}
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}

export default AlertCard
