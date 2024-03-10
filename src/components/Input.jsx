import { ErrorMessage, Field } from 'formik'

function Input({
  label,
  name,
  type = 'text',
  isInvalid,
  ...props
}) {
  return (
    <>
      {label && (
        <label
          className="mr-2 mb-1 block font-semibold"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Field
        name={name}
        type={type}
        className={`focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-100 rounded-md p-1 w-full ${
          isInvalid
            ? 'border-red-600/50 shadow-md shadow-red-600/30'
            : ''
        } ${
          type === 'number'
            ? '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none '
            : ''
        }`}
        {...props}
      />
      <ErrorMessage
        component="a"
        name={name}
        className="text-sm text-red-600"
      />
    </>
  )
}

export default Input
