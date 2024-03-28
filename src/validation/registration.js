import * as Yup from 'yup'

export const registrationSchema =
  Yup.object().shape({
    company_type: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Pilih bentuk'),
    company_name: Yup.string().required(
      'Masukkan nama perusahaan'
    ),
    contact_person: Yup.string().required(
      'Masukkan nama penanggung jawab'
    ),
    phone_number: Yup.string(
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
    qualification: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Pilih kualifikasi'),
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
