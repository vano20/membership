import {
  Navigate,
  RouteObject,
  RouterProvider,
  createHashRouter
} from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import MembershipPage from '@/pages/MembershipPage'
import GuestRoot from '@/pages/GuestRoot'
import RegistryPage from '@/pages/RegistryPage'
import { Toaster } from 'react-hot-toast'
import {
  AuthProvider,
  useAuth
} from '@/context/useAuth.jsx'
import AdminPage from '@/pages/AdminPage.jsx'
import AdminRoot from '@/pages/AdminRoot.jsx'
import SummaryPage from '@/pages/SummaryPage.jsx'
import AdminEditPage from '@/pages/AdminEditPage.jsx'
import { ReactNode } from 'react'

interface GuestRoutesProps {
  children: ReactNode;
}

const GuestRoutes = ({ children }: GuestRoutesProps) => {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn)
    return <Navigate to="/admin" replace />
  return children
}

interface AdminRoutesProps {
  children: ReactNode;
}

const AdminRoutes = ({ children }: AdminRoutesProps) => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn)
    return <Navigate to="/" replace />
  return children
}

const routes: RouteObject[] = [
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
        path: '/rahasia',
        element: <LoginPage />
      },
      {
        path: '/registry',
        element: <RegistryPage />
      },
      {
        path: '/summary',
        element: <SummaryPage />
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
      },
      {
        path: '/admin/form/:id',
        element: <AdminEditPage />
      },
    ]
  }
]

const router = createHashRouter(routes)

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
