import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext({
   signed: Boolean,
   user: Object | null,
   signOut: null,
   signIn: Promise

});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({} | null);
  
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@Auth:user');
      const storagedToken = localStorage.getItem('@Auth:token');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
      
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    localStorage.setItem('@Auth:user', JSON.stringify(response.user));
    localStorage.setItem('@Auth:token', response.token);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  
  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
