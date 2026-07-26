import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthProvider/AuthProvider';
const useAuth = () => {
    const userInfo = use(AuthContext)
    return userInfo
    
};

export default useAuth;