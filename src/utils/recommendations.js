import { THRESHOLDS } from './thresholds'
import { DESTINATIONS } from '../data/destinations'
import { HANOI_EVENTS, getUpcomingEvents } from '../data/events'
import { FEEDBACK_TREND } from '../data/feedback'
import { formatDate } from './formatters'

/**
 * recommendations.js — Rule-based recommendation engine
 * 4 loại gợi ý: điểm đến, lưu trú, feedback spike, sự kiện truyền thông
 * Logic theo PROJECT_BRIEF.md mục 9
 */

// Độ ưu tiên để sắp xếp
const PRIORITY = { critical: 0, warning: 1, info: 2, success: 3 }

// ─── Rule 1: Điểm đến ────────────────────────────────────────────────────────

export function getDestinationRecommendations(densityData = {}) {
  const recs = []

  DESTINATIONS.forEach((dest) => {
    const density = densityData[dest.id] ?? dest.defaultDensity

    if (density >= THRESHOLDS.destination.critical * 100) {
      // Tìm điểm lân cận nhẹ tải nhất để điều hướng
      const redirectTarget = findBestRedirect(dest, densityData)
      recs.push({
        id:          `dest-critical-${dest.id}`,
        type:        'critical',
        category:    'destination',
        priority:    0,
        title:       `Quá tải tại ${dest.name}`,
        detail:      `Mật độ hiện tại: ${density}% sức chứa (vượt ngưỡng nguy hiểm 95%)`,
        actions: [
          `Tăng cường 10 nhân viên an ninh + vệ sinh tại cổng vào`,
          redirectTarget
            ? `Điều hướng du khách sang ${redirectTarget.name} (hiện ${densityData[redirectTarget.id] ?? redirectTarget.defaultDensity}%)`
            : `Tạm ngừng tiếp nhận khách mới vào khu vực`,
          `Phát thông báo qua loa + biển báo điều hướng`,
        ],
      })
    } else if (density >= THRESHOLDS.destination.warning * 100) {
      recs.push({
        id:       `dest-warning-${dest.id}`,
        type:     'warning',
        category: 'destination',
        priority: 1,
        title:    `Đông khách tại ${dest.name}`,
        detail:   `Mật độ: ${density}% — Tiếp cận ngưỡng 80%, cần theo dõi`,
        actions: [
          `Bố trí thêm 3–5 nhân viên hỗ trợ du khách`,
          `Mở thêm lối vào/ra để giảm ùn tắc`,
        ],
      })
    }
  })

  return recs
}

// ─── Rule 2: Lưu trú ─────────────────────────────────────────────────────────

export function getAccommodationRecommendations(accommodationData = []) {
  return accommodationData
    .filter((d) => d.capacity >= THRESHOLDS.accommodation.warning * 100)
    .map((d) => ({
      id:       `accom-${d.district}`,
      type:     d.capacity >= THRESHOLDS.accommodation.critical * 100 ? 'critical' : 'warning',
      category: 'accommodation',
      priority: d.capacity >= THRESHOLDS.accommodation.critical * 100 ? 0 : 1,
      title:    `Công suất lưu trú ${d.district}: ${d.capacity}%`,
      detail:   d.capacity >= 95
        ? `Vượt ngưỡng nguy hiểm — ${d.totalRooms.toLocaleString('vi-VN')} phòng, gần hết chỗ`
        : `Tiếp cận ngưỡng cảnh báo 85%`,
      actions: [
        `Liên hệ các cơ sở lưu trú khu vực lân cận để điều phối phòng trống`,
        `Cập nhật thông tin phòng trống lên cổng thông tin du lịch Hà Nội`,
        d.capacity >= 95 ? `Kích hoạt danh sách cơ sở lưu trú dự phòng` : `Cảnh báo sớm cho các đại lý du lịch`,
      ],
    }))
}

// ─── Rule 3: Spike feedback tiêu cực ─────────────────────────────────────────

export function getFeedbackRecommendations() {
  const recs = []
  // Kiểm tra 3 ngày gần nhất
  const recent = FEEDBACK_TREND.slice(-5)
  const spikeCount = recent.filter((d) => d.negPct > 25).length

  if (spikeCount >= 2) {
    // Tìm chủ đề tiêu cực nhiều nhất (hardcode từ data mẫu)
    recs.push({
      id:       'feedback-spike',
      type:     'warning',
      category: 'feedback',
      priority: 1,
      title:    'Xu hướng phản ánh tiêu cực tăng bất thường',
      detail:   `Phát hiện >25% phản ánh tiêu cực trong ${spikeCount} ngày liên tiếp gần đây`,
      actions: [
        `Kiểm tra chất lượng dịch vụ tại Phố Cổ và Văn Miếu (nhiều phản ánh nhất)`,
        `Họp khẩn đội vệ sinh & dịch vụ khu vực Hoàn Kiếm`,
        `Phản hồi các phản ánh tiêu cực trong vòng 24 giờ`,
      ],
    })
  }

  // Gợi ý tổng quát luôn hiển thị
  recs.push({
    id:       'feedback-general',
    type:     'info',
    category: 'feedback',
    priority: 2,
    title:    'Cải thiện chất lượng dịch vụ định kỳ',
    detail:   `Giá cả và Vệ sinh là 2 chủ đề có tỷ lệ tiêu cực cao nhất (tháng 3/2025)`,
    actions: [
      `Tổ chức kiểm tra giá niêm yết tại các cơ sở kinh doanh Phố Cổ`,
      `Tăng tần suất dọn dẹp tại Văn Miếu và khu WC công cộng`,
    ],
  })

  return recs
}

// ─── Rule 4: Sự kiện & truyền thông ─────────────────────────────────────────

export function getEventRecommendations(daysAhead = 30) {
  const upcoming = getUpcomingEvents(daysAhead)
  return upcoming.map((event) => {
    const daysLeft = Math.ceil((new Date(event.date) - new Date()) / 86400000)
    const urgency  = daysLeft <= 7 ? 'critical' : daysLeft <= 14 ? 'warning' : 'info'

    return {
      id:       `event-${event.id}`,
      type:     urgency,
      category: 'event',
      priority: urgency === 'critical' ? 0 : urgency === 'warning' ? 1 : 2,
      title:    `Sắp diễn ra: ${event.name}`,
      detail:   `Ngày ${formatDate(event.date)} — còn ${daysLeft} ngày — dự kiến ~${event.expectedVisitors.toLocaleString('vi-VN')} lượt khách`,
      actions:  buildEventActions(event, daysLeft),
    }
  })
}

/** Tạo danh sách hành động cụ thể cho từng loại sự kiện */
function buildEventActions(event, daysLeft) {
  const base = [
    `Đăng thông báo sự kiện lên website & mạng xã hội Sở Du lịch`,
    `Chuẩn bị lực lượng: ước tính ${Math.round(event.expectedVisitors / 500)} nhân viên hỗ trợ`,
  ]
  if (event.type === 'national') base.push(`Phối hợp Công an, Giao thông điều tiết giao thông khu vực`)
  if (event.type === 'cultural') base.push(`Thiết kế banner truyền thông quảng bá điểm đến liên quan`)
  if (daysLeft <= 7)             base.push(`⚠️ Khẩn: Họp Ban chỉ đạo tổ chức sự kiện trong 48 giờ`)
  return base
}

// ─── Tổng hợp tất cả gợi ý ───────────────────────────────────────────────────

export function getAllRecommendations(densityData, accommodationData) {
  return [
    ...getDestinationRecommendations(densityData),
    ...getAccommodationRecommendations(accommodationData),
    ...getFeedbackRecommendations(),
    ...getEventRecommendations(30),
  ].sort((a, b) => a.priority - b.priority)
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function findBestRedirect(source, densityData) {
  // Ưu tiên điểm trong nearbyIds, sau đó điểm gần nhất
  const candidates = source.nearbyIds?.length
    ? DESTINATIONS.filter((d) => source.nearbyIds.includes(d.id))
    : DESTINATIONS.filter((d) => d.id !== source.id)

  return candidates
    .map((d) => ({ ...d, density: densityData[d.id] ?? d.defaultDensity }))
    .filter((d) => d.density < 70)
    .sort((a, b) => a.density - b.density)[0] || null
}
