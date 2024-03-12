import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '/src/components/Input'
import { useLoginMutation } from '/src/store'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/context//useAuth'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const { handleIsLogin } = useAuth()
  const navigate = useNavigate()
  const [login, { isLoading }] =
    useLoginMutation()
  const handlFormSubmit = async (
    values,
    action
  ) => {
    try {
      const result = await login(values).unwrap()
      toast.success('Login berhasil!')
      action.setSubmitting(false)
      handleIsLogin(result.token)
      navigate('/admin')
    } catch (error) {
      toast.error(
        error?.message || 'Login gagal!'
      )
    }
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(
      'Masukkan username'
    ),
    password: Yup.string().required(
      'Masukkan password'
    )
  })

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={handlFormSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  name="username"
                  label="Username"
                  isInvalid={
                    touched.username &&
                    errors.username
                  }
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  isInvalid={
                    touched.password &&
                    errors.password
                  }
                />
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="py-1 px-3 text-white rounded active:bg-blue-500/50 bg-blue-500 disabled:opacity-75"
                  disabled={
                    isSubmitting || isLoading
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
