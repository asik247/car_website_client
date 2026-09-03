import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000/"
})
const useInstanceScure = () => {
    //Todo current user.
    const {user} = useAuth();
    //? useEffect code.
    useEffect(()=>{
        const requestIntercepter = axios.interceptors.request.use((config)=>{
            console.log('AccessToken here',user?.accessToken);
            if(user?.accessToken){
                config.headers.Authorization = `Bearer ${user?.accessToken}`
            }
            return config
        },(err)=>{
            return Promise.reject(err)
        })
        //? unmount code.
        return ()=>{
            instanceSecure.interceptors.request.eject(requestIntercepter);
        }
    },[user])
    return instanceSecure
};

export default useInstanceScure;