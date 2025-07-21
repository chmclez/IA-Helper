import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  subjects?: string[];
  progress?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserSubjects: (subjects: string[]) => void;
  updateProgress: (progress: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: Record<string, User & { password: string }> = {
  'ibmaster@gmail.com': {
    id: '1',
    name: 'Admin',
    email: 'ibmaster@gmail.com',
    password: 'IloveIB!',
    role: 'admin',
    subjects: [],
    progress: 100
  },
  'talal@gmail.com': {
    id: '2',
    name: 'Talal',
    email: 'talal@gmail.com',
    password: 'IloveIB!',
    role: 'student',
    subjects: [],
    progress: 0
  },
  'abrah@gmail.com': {
    id: '3',
    name: 'Abrah',
    email: 'abrah@gmail.com',
    password: 'IloveIB!',
    role: 'student',
    subjects: [],
    progress: 0
  },
  'ali@gmail.com': {
    id: '4',
    name: 'Ali',
    email: 'ali@gmail.com',
    password: 'IloveIB!',
    role: 'student',
    subjects: [],
    progress: 0
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = mockUsers[email];
    if (userData && userData.password === password) {
      const { password: _, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserSubjects = (subjects: string[]) => {
    if (user) {
      const updatedUser = { ...user, subjects };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      // Update mock database
      if (mockUsers[user.email]) {
        mockUsers[user.email].subjects = subjects;
      }
    }
  };

  const updateProgress = (progress: number) => {
    if (user) {
      const updatedUser = { ...user, progress };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      // Update mock database
      if (mockUsers[user.email]) {
        mockUsers[user.email].progress = progress;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserSubjects, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}