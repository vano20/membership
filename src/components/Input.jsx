import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'
import {
  IoMdEye,
  IoMdEyeOff
} from 'react-icons/io'

function Input({
  label,
  name,
  type = 'text',
  isInvalid,
  ...props
}) {
  const [theType, setTheType] = useState(type)
  const handleToggleShowPassword = () => {
    let newType = theType
    if (newType === 'password') newType = 'text'
    else newType = 'password'
    setTheType(newType)
  }

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
      <div className="relative">
        <Field
          name={name}
          type={theType}
          className={`focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-300 rounded-md py-1 px-2 w-full h-10 placeholder:text-sm ${isInvalid
              ? 'border-red-600/50 shadow-md shadow-red-600/30'
              : ''
            } ${type === 'number'
              ? '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none '
              : ''
            }`}
          {...props}
        />
        {type === 'password' && (
          <span
            className="absolute top-1/2 transform -translate-y-1/2 right-3"
            onClick={handleToggleShowPassword}
          >
            {theType === 'password' ? (
              <IoMdEyeOff
                className="cursor-pointer"
                size="24px"
              />
            ) : (
              <IoMdEye
                className="cursor-pointer"
                size="24px"
              />
            )}
          </span>
        )}
      </div>
      <ErrorMessage
        component="a"
        name={name}
        className="text-sm text-red-600"
      />
    </>
  )
}

export default Input
