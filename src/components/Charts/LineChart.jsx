import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

/**
 * LineChart — Biểu đồ đường dùng chung (bọc Recharts)
 * Props:
 *   data    — Array dữ liệu
 *   lines   — Array of { key, name, color } — mỗi đường một cấu hình
 *   xKey    — Key cho trục X (mặc định 'name')
 *   height  — Chiều cao biểu đồ (mặc định 300)
 *   formatter — Hàm format tooltip value
 */
function LineChart({ data = [], lines = [], xKey = 'name', height = 300, formatter }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={formatter} />
        <Tooltip formatter={formatter ? (val) => formatter(val) : undefined} />
        <Legend />
        {lines.map(({ key, name, color }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={name}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart
