import { generateVisitorData, generateYearComparisonData } from './generators'

// Dữ liệu lượt khách năm 2024 và 2025
export const VISITOR_DATA_2025 = generateVisitorData(2025)
export const VISITOR_DATA_2024 = generateVisitorData(2024)

// Dữ liệu so sánh cùng kỳ
export const VISITOR_COMPARISON = generateYearComparisonData(2025)

// Tổng hợp KPI năm 2025
export const VISITOR_KPI = {
  totalVisitors:        VISITOR_DATA_2025.reduce((s, m) => s + m['Tổng'], 0),
  domesticVisitors:     VISITOR_DATA_2025.reduce((s, m) => s + m['Nội địa'], 0),
  internationalVisitors: VISITOR_DATA_2025.reduce((s, m) => s + m['Quốc tế'], 0),
  growthRate:           12.3, // % tăng trưởng so với 2024
}

// Top nguồn khách quốc tế
export const TOP_SOURCES = [
  { name: 'Trung Quốc',     value: 18 },
  { name: 'Hàn Quốc',      value: 15 },
  { name: 'Nhật Bản',       value: 12 },
  { name: 'Mỹ',             value: 10 },
  { name: 'Châu Âu',        value: 22 },
  { name: 'Khác',           value: 23 },
]
