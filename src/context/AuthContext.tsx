import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortalUser = {
  id: number;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
};

type AuthContextType = {
  currentUser: PortalUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  users: PortalUser[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [users, setUsers] = useState<PortalUser[]>(() => {
    try {
      const saved = localStorage.getItem('gg_portal_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<PortalUser | null>(() => {
    try {
      const saved = localStorage.getItem('gg_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('gg_portal_users', JSON.stringify(users));
  }, [users]);

  // Persist current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gg_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gg_current_user');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check if email exists
    const user = users.find(u => u.email === email);
    if (!user) {
      return { success: false, error: "Account not exist" };
    }

    // Check if password matches
    if (user.password !== password) {
      return { success: false, error: "Invalid Password" };
    }

    // Success - set current user
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: "Email Id should not be a duplicate in database" };
    }

    // Create new user
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: PortalUser = {
      id: newId,
      name,
      email,
      password
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        login,
        logout,
        signup,
        users
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

