import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types/index.js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    // This will be implemented with Supabase later
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // TODO: Implement session check with Supabase
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking session:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement login with Supabase
      console.log('Login:', email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      // TODO: Implement signup with Supabase
      console.log('Signup:', fullName, email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Implement logout with Supabase
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // TODO: Implement Google OAuth with Supabase
      console.log('Google login');
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithGitHub = async () => {
    try {
      // TODO: Implement GitHub OAuth with Supabase
      console.log('GitHub login');
    } catch (error) {
      console.error('GitHub login error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithGitHub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};