import { Outlet } from 'react-router-dom'
export default function AdminRoot() {
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center overflow-auto bg-gradient-to-r from-rose-400 to-orange-400 py-5">
        <Outlet />
      </div>
    </>
  )
}
