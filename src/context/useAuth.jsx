import { createContext, useContext } from 'react'
import { useLocalStorage } from '/src/hooks/use-local-storage'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isLoggedIn, setLogin] = useLocalStorage(
    'isLoggedIn',
    false
  )

  const handleIsLogin = token => {
    setLogin(token)
  }

  const logout = () => {
    setLogin(null)
  }

  const context = {
    isLoggedIn,
    handleIsLogin,
    logout
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
