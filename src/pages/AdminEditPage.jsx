import RegistrationsForm from '/src/components/RegistrationsForm'

export default function AdminEditPage() {

  const footer = (
    <div className="flex gap-4">
      <button
        className="py-1 px-3 text-slate rounded-lg active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500 disabled:bg-blue-500/20 disabled:text-slate-400"
      >
        Cancel
      </button>
      <button
        className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500 disabled:bg-blue-500/20 disabled:text-slate-400"
      >
        Save
      </button>
    </div>
  )

  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-white">
        <div className="flex flex-col md:w-1/2 w-full h-full bg-slate-200 border-2 rounded-md border-transparent px-10 pt-10 pb-5 shadow-lg shadow-slate-300 max-h-screen overflow-auto">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-2xl text-slate-700 font-semibold hidden md:block">
              Edit registrasi
            </h2>
          </div>

          <RegistrationsForm />
        </div>
      </div>
    </>
  )
}