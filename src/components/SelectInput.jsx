import { Field } from 'formik'
import Select from 'react-tailwindcss-select'

const SelectInput = (name, options, ...props) => {
  return (
    <Field name={name}>
      {({ field }) => (
        <Select
          {...field}
          {...props}
          options={options || []}
          onChange={e =>
            props.setFieldValue(name, e)
          }
        />
      )}
    </Field>
  )
}

export default SelectInput
