import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isSeller: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Test users for demo purposes
const TEST_USERS = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN' as const,
    name: 'Admin User'
  },
  {
    username: 'seller',
    email: 'seller@example.com',
    password: 'seller123',
    role: 'SELLER' as const,
    name: 'Seller User'
  },
  {
    username: 'customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'CUSTOMER' as const,
    name: 'Customer User'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Helper functions for role checking
  const isAdmin = () => user?.role === 'ADMIN';
  const isSeller = () => user?.role === 'SELLER' || user?.role === 'ADMIN';

  // In a real app, these functions would call an API
  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // Check if this is one of our test users
      const testUser = TEST_USERS.find(user => 
        (user.username === emailOrUsername || user.email === emailOrUsername) && 
        user.password === password
      );
      
      if (testUser) {
        // Login with the test user
        const userData: User = {
          id: `user-${testUser.username}`,
          username: testUser.username,
          email: testUser.email,
          role: testUser.role,
          name: testUser.name,
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else if (emailOrUsername && password) {
        // For non-test users, simulate a successful login as customer
        const userData: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          username: emailOrUsername.includes('@') ? emailOrUsername.split('@')[0] : emailOrUsername,
          email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@example.com`,
          role: 'CUSTOMER',
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string, name?: string): Promise<boolean> => {
    // Simulate API call
    try {
      // For demo purposes, just check if all fields are provided
      if (username && email && password) {
        // In a real app, you would send this data to your API
        // and then log the user in
        
        // For demo, we'll just simulate a successful signup
        const userData: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          username,
          name,
          email,
          role: 'CUSTOMER',
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, isSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 