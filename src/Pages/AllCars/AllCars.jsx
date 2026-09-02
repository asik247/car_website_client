import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useInstance from '../../Hooks/useInstance';

const AllCars = () => {
    const instance = useInstance();
    //? TranStack Query using get AllCars Data in db;
    const {data:allcars=[]} = useQuery({
        queryKey:['allCars'],
        queryFn:async()=>{
            const res = await instance.get('/allCars')
            return res.data
        }
    })
    return (
        <div>
            <h1>Hi All Cars Pages here!{allcars.length}</h1>
        </div>
    );
};

export default AllCars;