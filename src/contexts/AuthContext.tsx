import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/authAPI';

export type UserRole = 'user' | 'counsellor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app initialization
    const storedToken = localStorage.getItem('mindease_token');
    const storedUser = localStorage.getItem('mindease_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem('mindease_token');
        localStorage.removeItem('mindease_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password, role);
      
      setToken(response.token);
      setUser(response.user);
      
      // Store in localStorage
      localStorage.setItem('mindease_token', response.token);
      localStorage.setItem('mindease_user', JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setIsLoading(true);
      const response = await authAPI.signup(email, password, name, role);
      
      setToken(response.token);
      setUser(response.user);
      
      // Store in localStorage
      localStorage.setItem('mindease_token', response.token);
      localStorage.setItem('mindease_user', JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('mindease_token');
    localStorage.removeItem('mindease_user');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};