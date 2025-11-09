
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (fullName: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This simulates checking for an existing session on app load.
    const checkSession = async () => {
      try {
        const sessionUser = await api.checkSession();
        setUser(sessionUser);
      } catch (error) {
        // No active session
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const loggedInUser = await api.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const signup = async (fullName: string, email: string, password: string): Promise<User | null> => {
    try {
      const newUser = await api.signup(fullName, email, password);
      // In a real app, email verification would happen here.
      // For this mock, we'll log the user in directly.
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Signup failed:", error);
      return null;
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === Role.ADMIN;

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
