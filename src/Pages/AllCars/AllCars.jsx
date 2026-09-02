import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useInstance from '../../Hooks/useInstance';

const AllCars = () => {
    const instance = useInstance();
    //? TranStack Query using get AllCars Data in db;
    const { data: allcars = [],isLoading ,isError } = useQuery({
        queryKey: ['allCars'],
        queryFn: async () => {
            const res = await instance.get('/allCars')
            return res.data
        }
    })
    //! Loading message here.
    if(isLoading){
        return <p>Cars loading now...</p>
    }
    if(isError){
        return <p>{isError.message}</p>
    }
    if(!allcars.length){
        return <p>No car here</p>
    }
    return (
        <div>
           
            {
               
                allcars.map(car => <div key={car._id}>
                    <h1>{car.carName}</h1>

                </div>)

            }
            

        </div>
    );
};

export default AllCars;
/**
 * {
    "_id": "7cb2c083eb8cb37f0a72e9d3",
    "carName": "Ferrari 250 GTO",
    "category": "Classic Racing Car",
    "price": 3383140,
    "currency": "USD",
    "image": "https://images.unsplash.com/photo-1597687210367-a4915552d886?w=800&h=500&auto=format&fit=crop&q=80",
    "description": "The Ferrari 250 GTO represents Ferrari's relentless pursuit of performance and elegance. Combining a 3.9L V8 Twin-Turbo with Ferrari's legendary Italian craftsmanship, this classic racing car delivers an exhilarating driving experience for 1962 and beyond, blending motorsport-derived technology with everyday usability.",
    "carInformation": {
        "manufacturer": "Ferrari",
        "modelYear": 1962,
        "engine": "3.9L V8 Twin-Turbo",
        "horsepower": "942 HP",
        "torque": "673 Nm",
        "topSpeed": "317 km/h",
        "acceleration0to100": "3.0 sec",
        "transmission": "7-Speed Dual-Clutch Automatic",
        "drivetrain": "RWD",
        "fuelType": "Petrol",
        "seatingCapacity": 2,
        "weight": "1800 kg",
        "bodyType": "Classic Racing Car",
        "color": "Nero Daytona Black",
        "countryOfOrigin": "Italy"
    },
    "imageGallery": [
        "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1654442594766-68a1aa2ea5c8?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1615440321449-83897161d806?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1618102973579-3c6852d015d2?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1024&h=683&auto=format&fit=crop&q=80"
    ],
    "features": [
        "Premium Leather Interior",
        "Bluetooth & Apple CarPlay",
        "Advanced Aerodynamics Package",
        "Reverse Camera",
        "Keyless Entry",
        "Side Slip Control"
    ],
    "mileage": "11 km/l",
    "warranty": "3 Years Manufacturer Warranty",
    "availability": "Pre-Order",
    "rating": 4.9,
    "reviewsCount": 62,
    "dealerLocation": "Ferrari Dealership - Tokyo",
    "createdAt": "1962-01-15T10:00:00.000Z",
    "updatedAt": "2026-07-15T10:00:00.000Z"
}
 */