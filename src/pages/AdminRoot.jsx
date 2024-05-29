import { Outlet } from 'react-router-dom'
export default function AdminRoot() {
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center overflow-auto bg-white py-8">
        <Outlet />
      </div>
    </>
  )
}
