import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => { }
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (localStorage.getItem('jwtoken')) {
      return true;
    }
    return false;
  });

  return (
    <UserContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};