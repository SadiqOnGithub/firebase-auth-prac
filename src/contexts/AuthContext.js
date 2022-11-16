import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((user) => null)
      .catch((err) => err.code);
  }

  async function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((user) => null)
      .catch((err) => err.code);
  }
  
  async function logOut(email, password) {
    return signOut(auth)
    .then((user) => null)
    .catch((err) => err.code);
  }
  
  async function emailUpdate(email) {
    return updateEmail(auth.currentUser, email)
      .then((user) => null)
      .catch((err) => err.code);
  }

  async function passwordUpdate(password) {
    return updatePassword(auth.currentUser, password)
      .then((user) => null)
      .catch((err) => err.code);
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  let value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    emailUpdate,
    passwordUpdate,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
