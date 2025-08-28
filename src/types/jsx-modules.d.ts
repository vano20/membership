declare module './pages/LoginPage' {
  import { ComponentType } from 'react';
  const LoginPage: ComponentType<{}>;
  export default LoginPage;
}

declare module './pages/MembershipPage' {
  import { ComponentType } from 'react';
  const MembershipPage: ComponentType<{}>;
  export default MembershipPage;
}

declare module './pages/GuestRoot' {
  import { ComponentType } from 'react';
  const GuestRoot: ComponentType<{}>;
  export default GuestRoot;
}

declare module './pages/RegistryPage' {
  import { ComponentType } from 'react';
  const RegistryPage: ComponentType<{}>;
  export default RegistryPage;
}

declare module './pages/AdminPage.jsx' {
  import { ComponentType } from 'react';
  const AdminPage: ComponentType<{}>;
  export default AdminPage;
}

declare module './pages/AdminRoot.jsx' {
  import { ComponentType } from 'react';
  const AdminRoot: ComponentType<{}>;
  export default AdminRoot;
}

declare module './pages/SummaryPage.jsx' {
  import { ComponentType } from 'react';
  const SummaryPage: ComponentType<{}>;
  export default SummaryPage;
}
declare module './context/useAuth.jsx' {
  import { ComponentType } from 'react';
  export const useAuth: () => {
    isLoggedIn: boolean;
    accessToken: string | null;
    handleIsLogin: (token: string | null) => void;
    logout: () => void;
  };
  export const AuthProvider: ComponentType<{ children: React.ReactNode }>;
}