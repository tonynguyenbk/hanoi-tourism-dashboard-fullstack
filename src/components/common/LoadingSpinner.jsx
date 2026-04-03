/**
 * LoadingSpinner — Vòng tròn loading dùng chung
 * Props:
 *   size    — 'sm' | 'md' | 'lg'
 *   text    — Văn bản hiển thị kèm (tuỳ chọn)
 *   fullPage — true = căn giữa toàn trang
 */
function LoadingSpinner({ size = 'md', text, fullPage = false }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} rounded-full animate-spin`}
        style={{ borderColor: '#BFDBFE', borderTopColor: '#2E86C1' }}
      />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  )

  if (fullPage) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
