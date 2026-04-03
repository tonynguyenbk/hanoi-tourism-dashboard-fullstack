import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { DESTINATIONS } from '../../data/destinations'

// Fix icon marker mặc định của Leaflet bị vỡ khi dùng Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/**
 * Màu circle theo % mật độ
 */
function getDensityColor(density) {
  if (density >= 95) return { fill: '#E74C3C', stroke: '#C0392B' } // Đỏ: quá tải
  if (density >= 80) return { fill: '#F39C12', stroke: '#D68910' } // Vàng: đông
  if (density >= 50) return { fill: '#2E86C1', stroke: '#1B4F72' } // Xanh: trung bình
  return             { fill: '#27AE60', stroke: '#1D8348' }         // Xanh lá: thưa
}

/**
 * Nhãn mức độ
 */
function getDensityLabel(density) {
  if (density >= 95) return '🔴 Quá tải'
  if (density >= 80) return '🟡 Đông khách'
  if (density >= 50) return '🟢 Bình thường'
  return '⚪ Thưa khách'
}

/**
 * Component con: tự động fit bounds khi dữ liệu thay đổi
 */
function MapBounds() {
  const map = useMap()
  useEffect(() => {
    const bounds = DESTINATIONS.map((d) => [d.lat, d.lng])
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map])
  return null
}

/**
 * HanoiHeatmap — Bản đồ Hà Nội với circle overlay mật độ du khách
 * Props:
 *   densityData — { [destinationId]: density% }
 *   onSelectDest — callback(destination) khi click vào điểm
 */
function HanoiHeatmap({ densityData = {}, onSelectDest }) {
  const hanoiCenter = [21.0285, 105.8542]

  return (
    <MapContainer
      center={hanoiCenter}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      {/* Tile map OpenStreetMap — miễn phí, không cần API key */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapBounds />

      {/* Circle overlay cho từng điểm đến */}
      {DESTINATIONS.map((dest) => {
        const density = densityData[dest.id] ?? dest.defaultDensity
        const { fill, stroke } = getDensityColor(density)
        const radius = 120 + density * 2.5 // Bán kính tỷ lệ mật độ (mét)

        return (
          <Circle
            key={dest.id}
            center={[dest.lat, dest.lng]}
            radius={radius}
            pathOptions={{
              color: stroke,
              fillColor: fill,
              fillOpacity: 0.45,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onSelectDest && onSelectDest(dest),
            }}
          >
            {/* Tooltip cố định khi mật độ cao */}
            <Tooltip
              permanent={density >= 80}
              direction="top"
              offset={[0, -10]}
              className="leaflet-tooltip-custom"
            >
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                {density >= 95 ? '🔴 ' : density >= 80 ? '🟡 ' : ''}{dest.name.split('&')[0].trim()}
              </span>
              <br />
              <span style={{ fontSize: 11 }}>{density}% sức chứa</span>
            </Tooltip>

            {/* Popup chi tiết khi click */}
            <Popup>
              <div style={{ minWidth: 180 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{dest.name}</p>
                <table style={{ fontSize: 12, width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr><td style={{ color: '#666', paddingRight: 8 }}>Khu vực:</td><td><b>{dest.district}</b></td></tr>
                    <tr><td style={{ color: '#666' }}>Sức chứa:</td><td><b>{dest.capacity.toLocaleString('vi-VN')} người</b></td></tr>
                    <tr><td style={{ color: '#666' }}>Mật độ:</td><td style={{ fontWeight: 700, color: getDensityColor(density).fill }}>{density}%</td></tr>
                    <tr><td style={{ color: '#666' }}>Trạng thái:</td><td>{getDensityLabel(density)}</td></tr>
                  </tbody>
                </table>
              </div>
            </Popup>
          </Circle>
        )
      })}
    </MapContainer>
  )
}

export default HanoiHeatmap
