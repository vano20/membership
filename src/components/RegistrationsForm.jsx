import Input from './Input'
import {
  useEffect,
  useMemo,
  useState
} from 'react'
import Select from 'react-tailwindcss-select'
import {
  useAddRegistrationsMutation,
  useFetchCitiesQuery,
  useFetchProvincesQuery
} from '/src/store'
import {
  ErrorMessage,
  Field,
  Form,
  Formik
} from 'formik'
import toast from 'react-hot-toast'
import { capitalize } from '../helper/string'
import { registrationSchema } from '../validation/registration'

const RegistrationsForm = () => {
  const mapSelectOptions = (
    arr,
    callback = item => ({
      label: capitalize(item),
      value: item.toUpperCase()
    })
  ) => arr.map(callback)
  const dataQualifications = [
    'kecil',
    'menengah',
    'besar',
    'spesialis'
  ]
  const qualifications = mapSelectOptions(
    dataQualifications
  )
  const dataPositions = [
    'direktur',
    'diretur utama',
    'wakil direktur'
  ]
  const positions = mapSelectOptions(
    dataPositions
  )
  const dataType = ['PT', 'CV', 'Koperasi']
  const types = mapSelectOptions(dataType, i => ({
    label: i,
    value: i
  }))

  const [prov, setProv] = useState(null)
  const { data: provinces, isFetching } =
    useFetchProvincesQuery()
  const {
    data: cities,
    isFetching: isFetchingCities
  } = useFetchCitiesQuery(prov, {
    skip: !prov
  })
  const [
    addRegistration,
    {
      isError,
      isLoading,
      isSuccess,
      error,
      status,
      ...allObj
    }
  ] = useAddRegistrationsMutation()

  const [isPageLoading] = useMemo(() => {
    return [
      isLoading ||
        isFetching ||
        status === 'pending'
    ]
  }, [isLoading, isFetching, status])

  useEffect(() => {
    if (isError) {
      const [firstError] = error.npwp
      toast.error(
        firstError ||
          'Terjadi kesalahan, silahkan coba lagi'
      )
    } else if (isSuccess)
      toast.success(
        'Registrasi berhasil, data akan di validasi oleh admin terlebih dahulu'
      )
  }, [isError, isSuccess])

  const handleSelectProv = (value, form) => {
    const name = 'province'
    form.setFieldValue(name, value)

    setProv(value)
    if (!value) {
      form.setFieldValue('city', value)
      form.setFieldTouched(name, true)
    }
  }
  const handlFormSubmit = async (
    values,
    action
  ) => {
    const {
      province,
      city,
      qualification,
      position,
      ...rest
    } = values
    const body = {
      ...rest,
      province_id: city?.id,
      qualification: qualification?.value,
      position: position?.value
    }
    const result = await addRegistration(body)
    if (!result?.error) {
      action.setSubmitting(false)
      action.resetForm()
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          company_type: null,
          company_name: '',
          contact_person: '',
          email: '',
          phone_number: '',
          position: null,
          company_address: '',
          npwp: '',
          qualification: null,
          province: null,
          city: null
        }}
        validationSchema={registrationSchema}
        onSubmit={handlFormSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="md:block hidden font-semibold mb-1">
                  Perusahaan
                </label>
                <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                  <div className="md:w-1/3 w-full">
                    <label className="block md:hidden font-semibold mb-1">
                      Bentuk
                    </label>
                    <Field name="company_type">
                      {({ field, form }) => (
                        <Select
                          {...field}
                          options={types}
                          placeholder="PT"
                          noOptionsMessage="Data tidak ditemukan"
                          isClearable
                          isSearchable
                          onChange={e =>
                            form.setFieldValue(
                              'company_type',
                              e
                            )
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      component="a"
                      name="company_type"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block md:hidden font-semibold mb-1">
                      Perusahaan
                    </label>
                    <Input
                      name="company_name"
                      placeholder="Nama perusahaan"
                      isInvalid={
                        touched.company_name &&
                        errors.company_name
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                <div className="w-full">
                  <Input
                    name="contact_person"
                    label="Penanggung jawab"
                    placeholder="Nama penanggung jawab"
                    isInvalid={
                      touched.contact_person &&
                      errors.contact_person
                    }
                  />
                </div>
                {/* <div>
                <Input
                  name="position"
                  label="Jabatan"
                  placeholder="Jabatan"
                  isInvalid={
                    touched.position &&
                    errors.position
                  }
                />
              </div> */}
                <div className="w-full">
                  <label className="block font-semibold mb-1">
                    Jabatan
                  </label>
                  <Field name="position">
                    {({ field, form }) => (
                      <Select
                        {...field}
                        options={positions}
                        placeholder="Pilih jabatan"
                        noOptionsMessage="Data tidak ditemukan"
                        isClearable
                        isSearchable
                        onChange={e =>
                          form.setFieldValue(
                            'position',
                            e
                          )
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    component="a"
                    name="position"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-1">
                  Kualifikasi
                </label>
                <Field name="qualification">
                  {({ field, form }) => (
                    <Select
                      {...field}
                      options={qualifications}
                      placeholder="Pilih kualifikasi"
                      noOptionsMessage="Data tidak ditemukan"
                      isClearable
                      isSearchable
                      onChange={e =>
                        form.setFieldValue(
                          'qualification',
                          e
                        )
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  component="a"
                  name="qualification"
                  className="text-sm text-red-600"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="phone_number"
                  label="Nomor telepon"
                  placeholder="Nomor telepon"
                  isInvalid={
                    touched.phone_number &&
                    errors.phone_number
                  }
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Alamat email"
                  isInvalid={
                    touched.email && errors.email
                  }
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="NPWP"
                  name="npwp"
                  placeholder="NPWP perusahaan"
                  min="0"
                  isInvalid={
                    touched.npwp && errors.npwp
                  }
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Alamat
                </label>
                <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                  <div className="w-full">
                    <Field name="province">
                      {({ field, form }) => (
                        <Select
                          {...field}
                          options={
                            provinces || []
                          }
                          placeholder="Pilih provinsi"
                          noOptionsMessage="Data tidak ditemukan"
                          loading={isFetching}
                          isDisabled={isFetching}
                          isClearable
                          isSearchable
                          onChange={e =>
                            handleSelectProv(
                              e,
                              form
                            )
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      component="a"
                      name="province"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <div className="w-full">
                    <Field name="city">
                      {({ field, form }) => (
                        <Select
                          {...field}
                          options={
                            (prov && cities) || []
                          }
                          placeholder="Pilih kota/kabupaten"
                          noOptionsMessage="Data tidak ditemukan"
                          loading={
                            isFetchingCities
                          }
                          isDisabled={
                            isFetchingCities
                          }
                          isClearable
                          isSearchable
                          onChange={e =>
                            form.setFieldValue(
                              'city',
                              e
                            )
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      component="a"
                      name="city"
                      className="text-sm text-red-600"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Field name="company_address">
                  {({ field, form }) => (
                    <textarea
                      {...field}
                      className={`focus:outline-none focus:ring-0 focus:border-blue-200/75 border border-slate-300 rounded-md p-1 min-w-full focus:shadow-md focus:shadow-blue-500/30 ${
                        form.touched & form.errors
                          ? 'border-red-600/50'
                          : ''
                      }`}
                      placeholder="Masukkan alamat"
                    />
                  )}
                </Field>
                <ErrorMessage
                  component="a"
                  name="company_address"
                  className="text-sm text-red-600"
                />
              </div>
              {/* TODO: Upload photo */}
              {/* <div>
                    <label className="block font-semibold"> Foto </label>
                    <div className="relative inline-block">
                      <input type="file" className="
                        file:absolute file:right-0 
                        file:bg-blue-500 file:text-white file:border-0
                        file:py-1 file:px-3 file:rounded-md
                        file:shadow-md file:shadow-blue-500/30
                      " />
                    </div>
                  </div> */}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className={`py-1 px-3 text-white rounded active:bg-blue-500/50 bg-blue-500 disabled:bg-slate-400 border-transparent`}
                disabled={
                  isPageLoading || isSubmitting
                }
              >
                {isPageLoading
                  ? 'Loading..'
                  : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegistrationsForm
