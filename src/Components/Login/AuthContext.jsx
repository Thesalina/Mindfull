// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    // Load backend user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setBackendUser(JSON.parse(storedUser));
    }

    return unsubscribe;
  }, []);

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

  // Unified currentUser: prioritize Firebase user, otherwise backend user
  const currentUser = firebaseUser || backendUser;

  // Function to set backend user (to be called on backend login)
  const loginBackendUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setBackendUser(userData);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, loginBackendUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
