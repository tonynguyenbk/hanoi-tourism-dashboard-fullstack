/**
 * Lịch sự kiện du lịch Hà Nội — dùng cho Module 5: Gợi ý điều tiết
 */
export const HANOI_EVENTS = [
  { id: 1, name: 'Tết Nguyên Đán',             date: '2026-01-29', endDate: '2026-02-05', type: 'national', expectedVisitors: 500000 },
  { id: 2, name: 'Lễ hội Đền Ngọc Sơn',        date: '2026-02-13', endDate: '2026-02-15', type: 'local',    expectedVisitors: 50000 },
  { id: 3, name: 'Giỗ Tổ Hùng Vương',          date: '2026-04-16', endDate: '2026-04-18', type: 'national', expectedVisitors: 80000 },
  { id: 4, name: 'Lễ 30/4 - 1/5',              date: '2026-04-30', endDate: '2026-05-01', type: 'national', expectedVisitors: 300000 },
  { id: 5, name: 'Festival Áo dài Hà Nội',     date: '2026-10-10', endDate: '2026-10-15', type: 'cultural', expectedVisitors: 120000 },
  { id: 6, name: 'Quốc khánh 2/9',             date: '2026-09-02', endDate: '2026-09-04', type: 'national', expectedVisitors: 200000 },
  { id: 7, name: 'Giáng sinh & Countdown',     date: '2026-12-24', endDate: '2026-12-31', type: 'cultural', expectedVisitors: 250000 },
]

/**
 * Lấy các sự kiện sắp tới trong N ngày tới
 * @param {number} days — Số ngày tới (mặc định 14)
 */
export function getUpcomingEvents(days = 14) {
  const today = new Date()
  const future = new Date(today)
  future.setDate(today.getDate() + days)

  return HANOI_EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate >= today && eventDate <= future
  })
}
