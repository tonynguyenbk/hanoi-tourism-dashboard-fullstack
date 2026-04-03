/**
 * Button — Nút bấm dùng chung
 * Props:
 *   variant  — 'primary' | 'secondary' | 'danger' | 'ghost'
 *   size     — 'sm' | 'md' | 'lg'
 *   icon     — Component icon (optional)
 *   loading  — Hiện loading spinner
 */
function Button({ children, variant = 'primary', size = 'md', icon: Icon, loading, onClick, disabled, className = '', ...rest }) {
  const variants = {
    primary:   'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger:    'bg-red-600 text-white hover:bg-red-700',
    ghost:     'text-primary hover:bg-blue-50',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center gap-2 font-medium rounded-lg transition-colors
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
    </button>
  )
}

export default Button
