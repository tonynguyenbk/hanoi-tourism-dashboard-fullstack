/**
 * DateRangePicker — Chọn khoảng thời gian (từ ngày - đến ngày)
 * Props:
 *   startDate  — Ngày bắt đầu (string YYYY-MM-DD)
 *   endDate    — Ngày kết thúc (string YYYY-MM-DD)
 *   onChange   — Callback({ startDate, endDate })
 */
function DateRangePicker({ startDate, endDate, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="text-gray-500 text-xs font-medium">Từ ngày</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onChange({ startDate: e.target.value, endDate })}
        className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <label className="text-gray-500 text-xs font-medium">Đến ngày</label>
      <input
        type="date"
        value={endDate}
        min={startDate}
        onChange={(e) => onChange({ startDate, endDate: e.target.value })}
        className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

export default DateRangePicker
