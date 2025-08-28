import { Link } from "react-router-dom";
import RegistrationsForm from "@/components/RegistrationsForm";
import { logoGakindo } from "@/helper/assets";

export default function MembershipPage() {
  return (
    <div className="w-screen min-h-screen bg-slate-50">
      <main
        role="main"
        aria-labelledby="page-title"
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <header className="flex items-center justify-between gap-4 mb-6">
            <h1
              id="page-title"
              className="text-3xl sm:text-4xl font-semibold text-slate-800"
            >
              Registrasi
            </h1>
            <img
              src={logoGakindo}
              width={200}
              height={48}
              alt="Logo GAKINDO"
              className="rounded-md shrink-0"
            />
          </header>

          {/* Form */}
          <section id="registration-form" className="space-y-6">
            <RegistrationsForm />
          </section>

          {/* Footer link */}
          <div className="text-center mt-6">
            <span className="text-slate-700">Sudah mendaftar?</span>
            <Link
              to="/registry"
              className="ml-2 font-medium text-blue-700 hover:text-blue-800 underline underline-offset-2"
            >
              Cek perkembangan pendaftaran
            </Link>
          </div>
        </div>

        {/* 
        OPTIONAL: sticky helper bar for long forms (mobile friendly).
        Move your form's Submit here if needed, or render a <FormActions /> slot.
        <div className="sticky bottom-0 left-0 right-0 mt-4
                        bg-white/95 backdrop-blur border-t border-slate-200
                        px-4 sm:px-6 py-3 rounded-t-xl shadow-lg">
          <button
            type="submit"
            form="registration-form" // ensure your <form id="registration-form"> is set
            className="w-full h-12 rounded-lg bg-blue-600 text-white text-lg font-semibold
                       hover:bg-blue-700 focus:outline-none focus-visible:ring-2
                       focus-visible:ring-blue-400"
          >
            Submit
          </button>
        </div>
        */}
      </main>
    </div>
  );
}
