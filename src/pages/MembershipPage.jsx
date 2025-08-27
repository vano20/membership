import { Link } from "react-router-dom";
import RegistrationsForm from "/src/components/RegistrationsForm";
import { logoGakindo } from "../helper/assets";

export default function MembershipPage() {
  return (
    <>
      <div className="flex w-screen overflow-auto justify-center items-center bg-white">
        <div className="flex flex-col md:w-1/3 px-10 py-4 min-h-dvh bg-slate-200 border-2 rounded-xl border-transparent shadow-lg shadow-slate-300">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-4xl text-slate-700 font-semibold hidden md:block">
              Registrasi
            </h2>
            <img src={logoGakindo} width="200px" className="rounded-md" />
          </div>

          <RegistrationsForm />

          <div className="text-center mt-4 mb-0">
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
  );
}
