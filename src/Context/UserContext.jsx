import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const authContext = createContext([]);
const auth = getAuth(app);
const UserContext = ({ children }) => {
  const [user, Setuser] = useState("");
  const [loading, Setloading] = useState(true);

  const signUp = (email, password) => {
    Setloading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (profile) => {
    Setloading(true);

    return updateProfile(auth.currentUser, profile);
  };

  const login = (email, password) => {
    Setloading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = (provider) => {
    Setloading(true);

    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      Setuser(currentUser);
      Setloading(false);
      console.log("currentuser", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    signUp,
    updateUserProfile,
    login,
    loading,
    logout,
    Setloading,
    Setuser,
  };
  return (
    <div>
      <authContext.Provider value={authInfo}>{children}</authContext.Provider>
    </div>
  );
};

export default UserContext;
