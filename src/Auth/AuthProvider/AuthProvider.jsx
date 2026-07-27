import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.init';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

//Todo state hre.
const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);




    //Todo createAccoutn.
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //Todo logIn Users.
    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //Todo verifyEmail.
    const verifyEmail = ()=>{
        return sendEmailVerification(auth.currentUser)
    }
    //Todo forgot password.
    const forgotPassword = (userEmail)=>{
        return sendPasswordResetEmail(auth,userEmail)
    }
    //Todo update user.
    const updateUserInfo = (profileInfo)=>{
        return updateProfile(auth.currentUser,profileInfo)
    }


    //? onAuthStateChange implemt.
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
            unsubscribe()
        }
    },[])



    //? usersInfo here.
    const usersInfo = {
        registerUser,
        logInUser,
        user,
        loading,
        verifyEmail,
        forgotPassword,
        updateUserInfo
    }
    return <AuthContext.Provider value={usersInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;