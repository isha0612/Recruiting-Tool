import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () =>  useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if(localStorage.getItem('jwtoken')) {
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