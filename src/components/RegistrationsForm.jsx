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
import * as Yup from 'yup'
import toast from 'react-hot-toast'

const RegistrationsForm = () => {
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
    const { province, city, ...rest } = values
    const body = {
      ...rest,
      province_id: city?.id
    }
    const result = await addRegistration(body)
    if (!result?.error) {
      action.setSubmitting(false)
      action.resetForm()
    }
  }

  const registrationSchema = Yup.object().shape({
    company_name: Yup.string().required(
      'Masukkan nama perusahaan'
    ),
    contact_person: Yup.string().required(
      'Masukkan nama penanggung jawab'
    ),
    phone_number: Yup.number(
      'Telepon tidak valid'
    )
      .required('Masukkan Telepon')
      .test(
        'len',
        'Telepon tidak valid',
        val => val && val.toString().length <= 15
      ),
    position: Yup.string().required(
      'Masukkan jabatan'
    ),
    company_address: Yup.string().required(
      'Masukkan alamat perusahaan'
    ),
    npwp: Yup.number('NPWP tidak valid')
      .required('Masukkan NPWP')
      .test(
        'len',
        'NPWP tidak valid',
        val =>
          val &&
          val.toString().length >= 15 &&
          val.toString().length <= 16
      ),
    email: Yup.string()
      .email('Email tidak valid')
      .required('Masukkan email'),
    qualification: Yup.string().required(
      'Masukkan kualifikasi'
    ),
    province: Yup.object()
      .shape({
        disabled: Yup.boolean(),
        id: Yup.number(),
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Pilih provinsi'),
    city: Yup.object()
      .shape({
        disabled: Yup.boolean(),
        id: Yup.number(),
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Pilih kota/kabupaten')
  })

  return (
    <>
      <Formik
        initialValues={{
          company_name: '',
          contact_person: '',
          email: '',
          phone_number: '',
          position: '',
          company_address: '',
          npwp: '',
          qualification: '',
          province: null,
          city: null
        }}
        validationSchema={registrationSchema}
        onSubmit={handlFormSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  name="company_name"
                  label="Perusahaan"
                  placeholder="Nama perusahaan"
                  isInvalid={
                    touched.company_name &&
                    errors.company_name
                  }
                />
              </div>
              <div>
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
              <div>
                <Input
                  name="position"
                  label="Jabatan"
                  placeholder="Jabatan"
                  isInvalid={
                    touched.position &&
                    errors.position
                  }
                />
              </div>
              <div>
                <Input
                  name="qualification"
                  label="Kualifikasi"
                  placeholder="Kualifikasi"
                  isInvalid={
                    touched.qualification &&
                    errors.qualification
                  }
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
              <label className="block font-semibold">
                Alamat
              </label>
              <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                <div className="w-full">
                  <Field name="province">
                    {({ field, form }) => (
                      <Select
                        {...field}
                        options={provinces || []}
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
                        loading={isFetchingCities}
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
              <div className="w-full">
                <Field name="company_address">
                  {({ field, form }) => (
                    <textarea
                      {...field}
                      className={`focus:outline-none focus:ring-0 focus:border-blue-200/75 border border-slate-100 rounded-md p-1 min-w-full focus:shadow-md focus:shadow-blue-500/30 ${
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
                className={`py-1 px-3 text-white rounded active:bg-blue-500/50 bg-blue-500`}
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
