import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Share/Loading';
const PrivateRoutes = ({ children }) => {
    //? get current user in AuthProvider.
    const { user,loading } = useAuth()
    const location = useLocation();
   

    if(loading){
        return <Loading></Loading>
    }
   
    //Todo codintion.
    if (user) {
        return children
    }
    //! navigate login page.
    return <Navigate state={location.pathname}  to={'/auth'}></Navigate>
};

export default PrivateRoutes;