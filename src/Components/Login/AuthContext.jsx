import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false); // Done loading once Firebase initializes
    });

    // Load backend user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setBackendUser(JSON.parse(storedUser));
    }

    // If no Firebase user, still mark loading done
    if (!storedUser) setLoading(false);

    return () => unsubscribe();
  }, []);

  // Unified currentUser: prioritize Firebase user, otherwise backend user
  const currentUser = firebaseUser || backendUser;

  // Backend login
  const loginBackendUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) localStorage.setItem("token", token);
    setBackendUser(userData);
  };

  // Generic login (can be used for Firebase user too)
  const login = (userData) => {
    setBackendUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout from both Firebase and backend
  const logout = async () => {
    if (firebaseUser) {
      await firebaseSignOut(auth);
      setFirebaseUser(null);
    }
    if (backendUser) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setBackendUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, firebaseUser, backendUser, loginBackendUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
