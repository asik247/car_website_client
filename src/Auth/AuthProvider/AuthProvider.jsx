import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext } from 'react';
import { auth } from '../../Firebase/firebase.init';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {






    //Todo createAccoutn.
    const registerUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //? usersInfo here.
    const usersInfo = {
        registerUser
    }
    return <AuthContext.Provider value={usersInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;