import LoginForm from '/src/components/LoginForm'

export default function LoginPage() {
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-white">
        <div className="flex flex-col md:w-1/3 w-full h-full bg-slate-200 border-2 rounded-md border-transparent shadow-lg shadow-slate-300 px-10 pt-10 pb-5">
          <div className="flex md:justify-between justify-center items-center mb-8">
            <h2 className="text-2xl text-slate-700 font-semibold hidden md:block">
              Login
            </h2>
            <img
              src="https://gakindo.org/wp-content/uploads/2021/07/Gabungan-Kontraktor-Indonesia.jpg"
              width="200px"
              className="rounded-md"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
