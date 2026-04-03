/**
 * formatters.js — Hàm định dạng số, ngày, tiền tệ (tiếng Việt)
 */

/**
 * Format số lượt khách — hiển thị rút gọn (triệu/nghìn)
 * Ví dụ: 1500000 → "1,5 triệu" | 25000 → "25K"
 */
export function formatVisitors(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)} triệu`
  if (num >= 1_000)     return `${(num / 1_000).toFixed(0)}K`
  return num.toLocaleString('vi-VN')
}

/**
 * Format số đầy đủ với dấu phân cách nghìn
 * Ví dụ: 1234567 → "1.234.567"
 */
export function formatNumber(num) {
  return num.toLocaleString('vi-VN')
}

/**
 * Format % thay đổi — thêm dấu + nếu dương
 */
export function formatChange(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

/**
 * Format ngày tháng tiếng Việt
 * Ví dụ: new Date() → "02/04/2026"
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/**
 * Format khoảng thời gian tương đối
 * Ví dụ: "2 giờ trước"
 */
export function formatRelativeTime(date) {
  const now = new Date()
  const diff = Math.floor((now - new Date(date)) / 1000)

  if (diff < 60)    return `${diff} giây trước`
  if (diff < 3600)  return `${Math.floor(diff / 60)} phút trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
  return `${Math.floor(diff / 86400)} ngày trước`
}
