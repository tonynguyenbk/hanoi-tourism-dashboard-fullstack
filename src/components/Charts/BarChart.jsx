import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

/**
 * BarChart — Biểu đồ cột dùng chung (bọc Recharts)
 * Props:
 *   data    — Array dữ liệu
 *   bars    — Array of { key, name, color }
 *   xKey    — Key cho trục X
 *   height  — Chiều cao
 *   stacked — Xếp chồng các cột
 *   formatter — Hàm format tooltip
 */
function BarChart({ data = [], bars = [], xKey = 'name', height = 300, stacked = false, formatter }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={formatter} />
        <Tooltip formatter={formatter ? (val) => formatter(val) : undefined} />
        <Legend />
        {bars.map(({ key, name, color }) => (
          <Bar
            key={key}
            dataKey={key}
            name={name}
            fill={color}
            stackId={stacked ? 'stack' : undefined}
            radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart
