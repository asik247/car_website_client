import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useInstance from '../../Hooks/useInstance';

const CarsDetails = () => {
    const instance = useInstance();
    const {id} = useParams();
    console.log('id',id);;
    const {data:cars=[]} = useQuery({
        queryKey:['cars',id],
        queryFn:async()=>{
            const res = await instance.get(`/cars/details/${id}`)
            return res.data
        }
    })
    return (
        <div>
            <h1>Cars Details page {cars.price}</h1>
            {/* {console.log(cars)} */}
            <img src={cars.image} alt="" />
        </div>
    );
};

export default CarsDetails;