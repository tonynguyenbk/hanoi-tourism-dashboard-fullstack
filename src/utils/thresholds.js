/**
 * thresholds.js — Ngưỡng cảnh báo theo PROJECT_BRIEF.md mục 8
 */
export const THRESHOLDS = {
  accommodation: {
    warning:  0.85,  // Vàng: > 85% công suất
    critical: 0.95,  // Đỏ:   > 95% công suất
  },
  destination: {
    warning:  0.80,  // Vàng: > 80% sức chứa
    critical: 0.95,  // Đỏ:   > 95% sức chứa
  },
  feedback: {
    negativeSpike: 0.25, // Cảnh báo khi > 25% feedback tiêu cực trong ngày
  },
}

/**
 * Xác định mức cảnh báo cho một giá trị %
 * @returns 'normal' | 'warning' | 'critical'
 */
export function getAlertLevel(value, type = 'accommodation') {
  const t = THRESHOLDS[type]
  if (!t) return 'normal'

  const ratio = value / 100
  if (ratio >= t.critical) return 'critical'
  if (ratio >= t.warning)  return 'warning'
  return 'normal'
}

/**
 * Màu sắc theo mức cảnh báo
 */
export function getAlertColor(level) {
  switch (level) {
    case 'critical': return '#E74C3C'
    case 'warning':  return '#F39C12'
    default:         return '#27AE60'
  }
}
