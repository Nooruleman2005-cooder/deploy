// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // ✅ EXPORT THIS

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Fetch user profile from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
