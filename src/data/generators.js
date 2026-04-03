/**
 * generators.js — Hàm sinh dữ liệu mô phỏng realistic
 * Tuân theo hệ số mùa vụ du lịch Hà Nội (PROJECT_BRIEF.md mục 5)
 */

// Hệ số mùa vụ theo tháng (1-12)
export const SEASONAL_FACTORS = [1.3, 1.4, 1.0, 1.2, 0.7, 0.6, 0.65, 0.6, 0.85, 1.25, 1.3, 1.35]

// Lượng khách cơ sở mỗi tháng (tổng ~28 triệu/năm)
const BASE_MONTHLY_DOMESTIC       = 2_083_333  // 25 triệu / 12
const BASE_MONTHLY_INTERNATIONAL  =   333_333  //  4 triệu / 12

/**
 * Sinh dữ liệu lượt khách theo 12 tháng của một năm
 * @param {number} year — Năm cần sinh dữ liệu
 * @returns Array 12 phần tử
 */
export function generateVisitorData(year) {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

  return months.map((month, i) => {
    const factor = SEASONAL_FACTORS[i]
    // Thêm ±5% ngẫu nhiên để dữ liệu không quá đều
    const jitter = 1 + (Math.sin(year * 13 + i * 7) * 0.05)

    const domestic      = Math.round(BASE_MONTHLY_DOMESTIC      * factor * jitter)
    const international = Math.round(BASE_MONTHLY_INTERNATIONAL * factor * jitter)

    return {
      month,
      'Nội địa':    domestic,
      'Quốc tế':    international,
      'Tổng':       domestic + international,
    }
  })
}

/**
 * Sinh dữ liệu so sánh cùng kỳ năm nay vs năm trước
 * Năm trước = năm nay * 0.88 (tăng trưởng ~12%)
 */
export function generateYearComparisonData(year) {
  const thisYear = generateVisitorData(year)
  const lastYear = generateVisitorData(year - 1)

  return thisYear.map((item, i) => ({
    month: item.month,
    'Năm nay':   item['Tổng'],
    'Năm trước': lastYear[i]['Tổng'],
  }))
}

/**
 * Sinh dữ liệu lượt khách theo tuần (52 tuần trong năm)
 * @param {number} year
 */
export function generateWeeklyData(year) {
  return Array.from({ length: 52 }, (_, i) => {
    const week = i + 1
    // Xác định tháng tương ứng (xấp xỉ)
    const monthIndex = Math.floor(i / 4.33)
    const factor = SEASONAL_FACTORS[Math.min(monthIndex, 11)]
    const jitter = 1 + (Math.sin(year * 5 + i * 3) * 0.08)

    const base = BASE_MONTHLY_DOMESTIC / 4.33
    const domestic      = Math.round(base * factor * jitter)
    const international = Math.round((BASE_MONTHLY_INTERNATIONAL / 4.33) * factor * jitter)

    return {
      week: `T${week}`,
      'Nội địa':  domestic,
      'Quốc tế':  international,
      'Tổng':     domestic + international,
    }
  })
}

/**
 * Sinh dữ liệu lượt khách 30 ngày gần nhất
 */
export function generateDailyData() {
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (29 - i))

    const monthIndex = d.getMonth()
    const factor = SEASONAL_FACTORS[monthIndex]
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const weekendBonus = isWeekend ? 1.35 : 1.0
    const jitter = 1 + (seededRandom(i * 17 + monthIndex) - 0.5) * 0.15

    const base = BASE_MONTHLY_DOMESTIC / 30
    const domestic      = Math.round(base * factor * weekendBonus * jitter)
    const international = Math.round((BASE_MONTHLY_INTERNATIONAL / 30) * factor * weekendBonus * jitter)

    return {
      ngay: `${d.getDate()}/${d.getMonth() + 1}`,
      'Nội địa':  domestic,
      'Quốc tế':  international,
      'Tổng':     domestic + international,
    }
  })
}

/**
 * Sinh số ngẫu nhiên có hạt giống (seeded) — kết quả ổn định
 * @param {number} seed
 */
export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}
