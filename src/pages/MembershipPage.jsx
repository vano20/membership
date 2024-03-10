import { Link } from 'react-router-dom'
import RegistrationsForm from '../components/RegistrationsForm'

export default function MembershipPage() {
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-gradient-to-r from-rose-400 to-red-500">
        <div className="flex flex-col md:w-1/3 w-full h-full bg-neutral-200 border-2 rounded-md border-slate-100 px-10 pt-10 pb-5">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-2xl text-slate-700 font-semibold hidden md:block">
              Registrasi
            </h2>
            <img
              src="https://gakindo.org/wp-content/uploads/2021/07/Gabungan-Kontraktor-Indonesia.jpg"
              width="200px"
              className="rounded-md"
            />
          </div>
          <RegistrationsForm />
          <div className="text-center mt-2 mb-0">
            Sudah mendaftar?
            <Link
              as="a"
              to="/registry"
              className="ml-1 text-blue-600 hover:text-blue-500/30"
            >
              Cek perkembangan pendaftaran
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
