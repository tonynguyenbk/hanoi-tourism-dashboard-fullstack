import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

/**
 * PieChart — Biểu đồ tròn / donut dùng chung
 * Props:
 *   data    — Array of { name, value }
 *   colors  — Array màu sắc cho từng phần
 *   donut   — true = donut chart (có lỗ giữa)
 *   height  — Chiều cao
 */
function PieChart({ data = [], colors = [], donut = false, height = 300 }) {
  const defaultColors = ['#2E86C1', '#27AE60', '#F39C12', '#E74C3C', '#9B59B6', '#1ABC9C']
  const chartColors = colors.length ? colors : defaultColors

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={donut ? '55%' : 0}
          outerRadius="75%"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val) => val.toLocaleString('vi-VN')} />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  )
}

export default PieChart
