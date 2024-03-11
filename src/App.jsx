import {
  Navigate,
  RouterProvider,
  createHashRouter
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MembershipPage from './pages/MembershipPage'
import GuestRoot from './pages/GuestRoot'
import RegistryPage from './pages/RegistryPage'
import { Toaster } from 'react-hot-toast'
import {
  AuthProvider,
  useAuth
} from './context/useAuth.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AdminRoot from './pages/AdminRoot.jsx'

const GuestRoutes = ({ children }) => {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn)
    return <Navigate to="/admin" replace />
  return children
}
const AdminRoutes = ({ children }) => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn)
    return <Navigate to="/" replace />
  return children
}

const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <GuestRoutes>
          <GuestRoot />
        </GuestRoutes>
      </>
    ),
    children: [
      {
        index: true,
        element: <MembershipPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/registry',
        element: <RegistryPage />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <>
        <AdminRoutes>
          <AdminRoot />
        </AdminRoutes>
      </>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  }
])

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster position="top-center" />
    </>
  )
}

export default App
