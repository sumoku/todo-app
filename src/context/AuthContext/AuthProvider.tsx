import { createContext, SetStateAction, useContext, useState } from 'react';

const AuthContext = createContext({});

interface IAuthProvider {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

export function AuthProvider({ children }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext) as IAuthProvider;
}
