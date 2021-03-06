import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import client from '../api/restClient';
import Skeleton from 'react-loading-skeleton';
import { decodeToken, isExpired } from 'react-jwt';
import { User } from '../models';

interface IAuth {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  setUser: (user: any) => void;
  token: string;
}

const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadUserFromCookie() {
      console.log('Booted AuthProvider');

      const token = Cookies.get('token');
      const userFromCookie = Cookies.get('user');
      if (token && userFromCookie) {
        if (isExpired(token)) {
          logout();
        }
        client.defaults.headers.Authorization = `Bearer ${token}`;
        setToken(token);
        const decode = JSON.parse(userFromCookie);
        setUser(decode);
      }
      setLoading(false);
    }
    loadUserFromCookie();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data: token } = await client.post(`auth/login`, {
        username: email,
        password,
      });
      if (token) {
        const decode = decodeToken(token.access_token);
        Cookies.set('token', token.access_token, { expires: 60 });
        setToken(token.access_token);
        client.defaults.headers.Authorization = `Bearer ${token.access_token}`;
        const { data: user } = await client.get(
          `api/v1/users/${decode.sub}/profile`
        );
        Cookies.set('user', JSON.stringify(user));
        return Promise.resolve(user);
      }
      return Promise.reject(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    delete client.defaults.headers.Authorization;
    setTimeout(() => (window.location.pathname = '/auth/login'), 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading: loading,
        token,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [unProtectedUrls] = useState(['/auth/login', '/auth/create-account']);

  useEffect(() => {
    console.log('Booted ProtectedRoute');
  }, []);

  if (isLoading) {
    return <Skeleton height={40} count={5} />;
  } else if (
    !isAuthenticated &&
    unProtectedUrls.indexOf(window.location.pathname) < 0
  ) {
    window.location.pathname = unProtectedUrls[0];
    return <Skeleton height={40} count={5} />;
  } else if (
    isAuthenticated &&
    unProtectedUrls.indexOf(window.location.pathname) > -1
  ) {
    window.location.pathname = '/';
    return <Skeleton height={40} count={5} />;
  }
  return children;
};
