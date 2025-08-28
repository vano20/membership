import { Link } from "react-router-dom";
import RegistrationsForm from "/src/components/RegistrationsForm";

export default function AdminEditPage() {
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-slate-50">
        <div className="flex flex-col md:w-1/2 w-full h-full bg-white border-2 rounded-md border-transparent px-10 pt-10 pb-5 shadow-lg shadow-slate-300 max-h-screen overflow-auto">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-3xl text-slate-700 font-bold hidden md:block">
              Edit registrasi
            </h2>

            <Link
              as="a"
              to="/admin/"
              className="ml-1 text-blue-600 hover:text-blue-700"
            >
              Back
            </Link>
          </div>

          <RegistrationsForm />
        </div>
      </div>
    </>
  );
}
