import React from 'react'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from 'react-router-dom'
import MembershipPage from '../pages/MembershipPage'
import {
  AuthProvider,
} from '../context/useAuth.jsx'
import { store } from '../store/index.js'
import { router } from '../App.jsx'

test('renders title', async () => {
  const { getByText, getByRole } = render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router}>
            <MembershipPage />
          </RouterProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  )

  await expect.element(getByText('Registrasi')).toBeInTheDocument()
  // await getByRole('button', { name: 'Increment ' }).click()

  // await expect.element(getByText('Hello Vitest x2!')).toBeInTheDocument()
})
