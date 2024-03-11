export function Badge({
  label,
  children,
  variant
}) {
  const mapping = {
    yellow:
      'text-yellow-600 border-yellow-100 bg-yellow-600/20',
    green:
      'text-green-600 border-green-100 bg-green-600/20',
    red: 'text-red-600 border-red-100 bg-red-600/20'
  }
  return (
    <div
      className={`${mapping[variant]} rounded-md p-2 text-center`}
    >
      {label || children}
    </div>
  )
}
