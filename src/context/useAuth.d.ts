import { ComponentType } from 'react';

export const useAuth: () => {
  isLoggedIn: boolean;
  handleIsLogin: (token: string | null) => void;
  logout: () => void;
  accessToken: string | null;
};

export const AuthProvider: ComponentType<{ children: React.ReactNode }>;