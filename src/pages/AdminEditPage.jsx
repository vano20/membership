import { Link } from 'react-router-dom'
import RegistrationsForm from '/src/components/RegistrationsForm'

export default function AdminEditPage() {
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-white">
        <div className="flex flex-col md:w-1/2 w-full h-full bg-slate-200 border-2 rounded-md border-transparent px-10 pt-10 pb-5 shadow-lg shadow-slate-300 max-h-screen overflow-auto">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-4xl text-slate-700 font-semibold hidden md:block">
              Edit registrasi
            </h2>

            <Link
              as="a"
              to="/admin/"
              className="ml-1 text-blue-600 hover:text-blue-500/30"
            >
              Back
            </Link>
          </div>

          <RegistrationsForm />
        </div>
      </div>
    </>
  )
}