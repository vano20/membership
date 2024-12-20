export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  label = '',
  isDisabled,
  isLoading,
  rounded,
  fullRounded
}) {
  const variantMapping = {
    primary: 'active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500',
  }
  const roundedClass = rounded ? 'rounded' : ''
  const fullRoundedClass = fullRounded ? 'rounded-full' : ''
  const variantClass = variantMapping[variant] ?? ''

  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-3 text-white ${roundedClass} ${fullRoundedClass} ${variantClass} disabled:opacity-75`}
      disabled={isDisabled || isLoading}
    >
      {children}
    </button>
  )
}