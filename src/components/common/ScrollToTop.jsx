import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — Tự động cuộn về đầu trang mỗi khi đổi route
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Tìm phần tử main để scroll (không scroll cả window)
    const main = document.querySelector('main')
    if (main) main.scrollTop = 0
  }, [pathname])
  return null
}

export default ScrollToTop
