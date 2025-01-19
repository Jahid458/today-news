/* eslint-disable no-unused-vars */

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from './../firebase/firebase.config';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };

      const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      };

      const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };

      const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    

      const logOut = async () => {
        setLoading(true);
        return signOut(auth);
      };
    

 

 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false)
            console.log("Current user is ===> ", user);
        });
        return () =>{
            unsubscribe()
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const authInfo ={
        user,
        setUser,
        loading,
        setLoading,
        signInWithGoogle,
        createUser,
        signIn,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;