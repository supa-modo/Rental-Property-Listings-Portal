import React, { createContext, useContext, useState, useEffect } from "react";
import usersData from "../data/users.json";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userAuth');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('userAuth', JSON.stringify(user));
    } else {
      localStorage.removeItem('userAuth');
    }
  }, [user]);

  const login = (username, password) => {
    const foundUser = usersData.users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const userAuth = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
      };
      setUser(userAuth);
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userAuth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};