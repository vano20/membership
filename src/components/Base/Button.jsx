export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  isDisabled,
  isLoading,
  rounded,
  fullRounded
}) {
  const variantMapping = {
    primary: 'text-white active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500',
    secondary: 'text-slate active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-slate-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500',
    danger: 'text-white active:bg-red-500/50 bg-red-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-red-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-red-500/10 hover:text-red-500 disabled:bg-red-500/20'
  }
  const roundedClass = rounded ? 'rounded-lg' : ''
  const fullRoundedClass = fullRounded ? 'rounded-full' : ''
  const variantClass = variantMapping[variant] ?? ''

  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-3 disabled:opacity-75 disabled:text-slate-400 ${roundedClass} ${fullRoundedClass} ${variantClass}`}
      disabled={isDisabled || isLoading}
    >
      {children}
    </button>
  )
}