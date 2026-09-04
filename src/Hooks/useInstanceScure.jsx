import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useInstanceScure = () => {
    //Todo current user.
    const { user, logOutUser } = useAuth();
    // console.log('current user', user);
    // console.log('AccessToken here', user?.accessToken);

    //? useEffect code.
    useEffect(() => {
        const requestIntercepter = instanceSecure.interceptors.request.use((config) => {
            // console.log('AccessToken here', user?.accessToken);
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user?.accessToken}`
            }
            return config
        }, (err) => {
            return Promise.reject(err)
        })
        //! response intercepter.
        const response = instanceSecure.interceptors.response.use((response) => {
            return response
         }, (err) => {
            // console.log(err?.response?.status);
            if (err.response?.status === 401 || err.response?.status ===403) {
                // console.log('you logout');
                logOutUser()
                    .then(() => {
                        console.log('log out done');
                    })
            }
        })
        //? unmount code.
        return () => {
            instanceSecure.interceptors.request.eject(requestIntercepter);
            instanceSecure.interceptors.response.eject(response)
        }
    }, [user, logOutUser])
    return instanceSecure
};

export default useInstanceScure;