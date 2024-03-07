function Input({ label, name, placeholder, type = 'text' }) {
  return (
    <>
      {label && <label className="mr-2 mb-1 block font-semibold" htmlFor={name}>{label}</label>}
      <input name={name} type={type} className="focus:outline-none focus:ring-0 focus:border-blue-200/75 border border-slate-100 rounded-md p-1 min-w-full focus:shadow-md focus:shadow-blue-500/30" placeholder={placeholder} />
    </>
  )
}

export default Input