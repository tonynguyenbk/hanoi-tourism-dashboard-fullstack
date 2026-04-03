import { generateVisitorData, generateYearComparisonData, CURRENT_YEAR, CURRENT_MONTH_INDEX } from './generators'

/**
 * Dữ liệu lượt khách
 *
 * 2026 = năm hiện tại
 *   - T1–T3: số liệu thực tế (đã hoàn thành)
 *   - T4–T12: dự báo (dùng cùng model mùa vụ)
 * 2025 = năm trước — dùng để so sánh cùng kỳ
 */
export const VISITOR_DATA_2026 = generateVisitorData(CURRENT_YEAR)
export const VISITOR_DATA_2025 = generateVisitorData(2025)
export const VISITOR_DATA_2024 = generateVisitorData(2024)

// So sánh 2026 vs 2025 theo từng tháng
export const VISITOR_COMPARISON = generateYearComparisonData(CURRENT_YEAR)

// ─── KPI năm hiện tại — tính YTD (chỉ các tháng đã hoàn thành) ───────────────
const completedMonths2026 = VISITOR_DATA_2026.slice(0, CURRENT_MONTH_INDEX) // T1–T3
const completedMonths2025 = VISITOR_DATA_2025.slice(0, CURRENT_MONTH_INDEX) // cùng kỳ 2025

const ytdTotal2026 = completedMonths2026.reduce((s, m) => s + m['Tổng'], 0)
const ytdTotal2025 = completedMonths2025.reduce((s, m) => s + m['Tổng'], 0)
const ytdGrowth    = ytdTotal2025 > 0
  ? +((ytdTotal2026 - ytdTotal2025) / ytdTotal2025 * 100).toFixed(1)
  : 0

export const VISITOR_KPI = {
  totalVisitors:         ytdTotal2026,
  domesticVisitors:      completedMonths2026.reduce((s, m) => s + m['Nội địa'], 0),
  internationalVisitors: completedMonths2026.reduce((s, m) => s + m['Quốc tế'], 0),
  growthRate:            ytdGrowth,
  year:                  CURRENT_YEAR,
  ytdMonths:             CURRENT_MONTH_INDEX, // số tháng đã hoàn thành (3 = T1–T3)
  fullYear2025:          VISITOR_DATA_2025.reduce((s, m) => s + m['Tổng'], 0),
}

// Top nguồn khách quốc tế
export const TOP_SOURCES = [
  { name: 'Trung Quốc', value: 18 },
  { name: 'Hàn Quốc',   value: 15 },
  { name: 'Nhật Bản',   value: 12 },
  { name: 'Mỹ',         value: 10 },
  { name: 'Châu Âu',    value: 22 },
  { name: 'Khác',       value: 23 },
]
