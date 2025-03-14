/* eslint-disable no-unused-vars */

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from './../firebase/firebase.config';
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


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
    

 

 

    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) =>{
            setUser(currentUser);
            // console.log("Current user is ===> ", user);
           
            if(currentUser){

                //get token storage
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
                
                // new -----------------------------------------------


                 // Check premiumTaken status
        const userResponse = await axiosPublic.get(`/user/${currentUser.email}`);
        const userData = userResponse.data;
        if (userData.premiumEnds) {
          const premiumEndTime = new Date(userData.premiumEnds);
          const currentTime = new Date();

          if (currentTime > premiumEndTime) {
            await axiosPublic.patch(`/resetPremium/${currentUser.email}`, {
              premiumTaken: null,
              premiumEnds: null,
            });
            console.log("Subscription expired. Resetting premium status.");
            setUser((prevUser) => ({
              ...prevUser,
              premiumTaken: null,
              premiumEnds: null,
            }));
          } else {
            console.log("User is still a premium user.");
          }
        }

            }else{
                //remove token
                localStorage.removeItem('access-token') 

            }
            setLoading(false)
        });
        return () =>{
            unsubscribe()
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[axiosPublic])

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