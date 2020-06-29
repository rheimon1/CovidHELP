import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({}, () => {});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({} | null);
  
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@FSIAuth:user');
      const storagedToken = localStorage.getItem('@FSIAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        api.defaults.headers.user_id = JSON.parse(storagedUser).id;
      }
      
    }

    loadStorageData();
  }, []);

  async function signIn(data) {
    try {    
      setUser(data.user);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      api.defaults.headers.user_id = data.user.id;

      localStorage.setItem('@FSIAuth:user', JSON.stringify(data.user));
      localStorage.setItem('@FSIAuth:token', data.token);
    } catch (error) {
      alert('Falha no login, tente novamente')
    }
    
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
