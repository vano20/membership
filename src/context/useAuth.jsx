import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [accessToken, setLogin] = useLocalStorage("accessToken", null);

  const handleIsLogin = (token) => {
    setLogin(token);
  };

  const logout = () => {
    setLogin(null);
  };

  const isLoggedIn = useMemo(() => !!accessToken, [accessToken]);

  const context = {
    isLoggedIn,
    handleIsLogin,
    logout,
    accessToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
