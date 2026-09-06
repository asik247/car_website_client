import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const instance = axios.create({
     baseURL: "http://localhost:3000",
})
const useInstance = () => {
     const {logOutUser}= useAuth();
     //? useEffect code.
     useEffect(() => {
          //Todo request intecepter.
          const request = instance.interceptors.request.use((config) => {
               const token = localStorage.getItem("accessTokenJWT");
               // console.log(token);
               if (token) {
                    config.headers.Authorization = `Bearer ${token}`
               }
               return config
          }, (err) => {
               return Promise.reject(err)
          })
          //? response intecepter.
          const response = instance.interceptors.response.use(response => {
               return response
          }, erro => {
               // if(erro.response?.status)
               if(erro.response?.status === 401 || erro.response?.status === 402){
                    logOutUser()
                         .then(() => {
                              // console.log('log out done');
                         })
               }
          })
          return () => {
               //! unmount code.
               instance.interceptors.request.eject(request)
               instance.interceptors.response.eject(response)
          }

     }, [logOutUser])
     return instance
};

export default useInstance;