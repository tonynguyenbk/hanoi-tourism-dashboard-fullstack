/**
 * Select — Dropdown chọn lựa dùng chung
 * Props:
 *   options — Array of { value, label }
 *   value   — Giá trị đang chọn
 *   onChange — Callback khi thay đổi
 *   label   — Nhãn hiển thị phía trên
 */
function Select({ options = [], value, onChange, label, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-500">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   cursor-pointer"
      >
        {options.map(({ value: val, label: lbl }) => (
          <option key={val} value={val}>{lbl}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
