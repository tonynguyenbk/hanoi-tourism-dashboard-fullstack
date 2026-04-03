/**
 * GaugeChart — Biểu đồ gauge bán cung SVG (không dùng Recharts để render chính xác hơn)
 * Props:
 *   value  — Giá trị % (0-100)
 *   label  — Nhãn hiển thị dưới
 *   size   — Kích thước px (default 140)
 */
function GaugeChart({ value = 0, label = '', size = 140 }) {
  // Màu theo ngưỡng cảnh báo
  const color =
    value >= 95 ? '#E74C3C' :
    value >= 85 ? '#F39C12' :
    '#27AE60'

  // Tính arc SVG: bán cung từ 180° đến 0° (trái → phải)
  const r = 40           // bán kính
  const cx = 55, cy = 55 // tâm
  const startAngle = Math.PI        // 180°
  const endAngle   = Math.PI * (1 - value / 100) // tỷ lệ → góc

  // Toạ độ điểm cuối arc
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = value > 50 ? 1 : 0

  const bgPath  = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}` // nền xám
  const valPath = value > 0
    ? `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 0 ${x2} ${y2}`
    : ''

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size * 0.65} viewBox="0 0 110 65">
        {/* Track nền */}
        <path d={bgPath} fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
        {/* Arc giá trị */}
        {valPath && (
          <path d={valPath} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
        )}
        {/* Số % ở giữa */}
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
          {value}%
        </text>
      </svg>
      {label && (
        <p className="text-xs text-gray-600 text-center font-medium leading-tight max-w-[100px]">
          {label}
        </p>
      )}
    </div>
  )
}

export default GaugeChart
