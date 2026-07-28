import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
const PrivateRoutes = ({ children }) => {
    //? get current user in AuthProvider.
    const { user, } = useAuth()
    //Todo codintion.
    if (user) {
        return children
    }
    //! navigate login page.
    return <Navigate state={location.pathname} to={'/auth'}></Navigate>
};

export default PrivateRoutes;