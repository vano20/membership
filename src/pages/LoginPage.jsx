import { logoGakindo } from '../helper/assets'
import LoginForm from '/src/components/LoginForm'

export default function LoginPage() {
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center md:items-center bg-white">
        <div className="flex flex-col md:w-1/3 md:h-full w-full md:bg-slate-200 border-2 rounded-md border-transparent md:shadow-lg md:shadow-slate-300 px-10 pt-10 pb-5">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-2xl text-slate-700 font-semibold hidden md:block">
              Login
            </h2>

            <img
              src={logoGakindo}
              width="200px"
              className="rounded-md md:mt-0 mt-12"
            />
          </div>

          <div className="mt-24 md:mt-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
