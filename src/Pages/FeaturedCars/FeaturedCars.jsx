import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useInstance from '../../Hooks/useInstance';
import { Link } from 'react-router';
const FeaturedCars = () => {
    const instance = useInstance()
    //! transtack query using get cars data in db;
    const { data: cars = [], isLoading, error } = useQuery(
        {
            queryKey: ['cars'],
            queryFn: async () => {
                const res = await instance.get('/cars');
                return res.data;
            }
        }
    )
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return console.log(error.message);
    }
    return (
        <div>
            {/* contant */}
            <div className='w-full my-15 flex justify-between items-center'>
                <div>
                    <h1 className='text-4xl font-bold my-3'>Featured cars {cars.length}</h1>
                    <p className='text-gray-400'>you may fall in love</p>
                </div>
                {/* catagorys */}
                <div className='flex-wrap gap-4 lg:flex'>
                    <button className='btn btn-ghost'>LAMBORGIHINI</button>
                    <button className='btn btn-ghost'>HILO CAR</button>
                    <button className='btn btn-ghost'>MERCEDES</button>
                </div>
            </div>
            {/* Cars here */}
            <div>
                {
                    cars.map(car => <Link to={`/carsDetails/${car._id}`} key={car._id}>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src={car.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body w-full">
                                <h2 className="card-title">{car.category}</h2>
                                <h2 className="card-title">{car.carName}</h2>
                                <h3> ৳ {car.price.toLocaleString()}</h3>
                                <div className="flex gap-4">
                                    <span>{car.carInformation.modelYear}</span>
                                    <span>{car.carInformation.horsepower}</span>
                                    <span>{car.carInformation.topSpeed}</span>
                                </div>
                                <p>{car.mileage}</p>
                                <p>{car.rating}</p>
                                
                            </div>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default FeaturedCars;
/**{
    "_id": "fe16849ef307590d273e34f9",
    "carName": "Ferrari Enzo",
    "category": "Hypercar",
    "price": 3392752,
    "currency": "USD",
    "image": "https://images.unsplash.com/photo-1654442595371-891daed0b8ba?w=800&h=500&auto=format&fit=crop&q=80",
    "description": "The Ferrari Enzo represents Ferrari's relentless pursuit of performance and elegance. Combining a 3.0L V6 Hybrid Twin-Turbo with Ferrari's legendary Italian craftsmanship, this hypercar delivers an exhilarating driving experience for 2002 and beyond, blending motorsport-derived technology with everyday usability.",
    "carInformation": {
        "manufacturer": "Ferrari",
        "modelYear": 2002,
        "engine": "3.0L V6 Hybrid Twin-Turbo",
        "horsepower": "796 HP",
        "torque": "711 Nm",
        "topSpeed": "313 km/h",
        "acceleration0to100": "2.6 sec",
        "transmission": "6-Speed Manual",
        "drivetrain": "AWD",
        "fuelType": "Petrol",
        "seatingCapacity": 2,
        "weight": "1642 kg",
        "bodyType": "Hypercar",
        "color": "Bianco Avus White",
        "countryOfOrigin": "Italy"
    },
    "imageGallery": [
        "https://images.unsplash.com/photo-1597687190402-bd767ac2ce81?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1618102973579-3c6852d015d2?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1654442594787-1161dab5a2a1?w=1024&h=683&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1610388558394-974601045c25?w=1024&h=683&auto=format&fit=crop&q=80"
    ],
    "features": [
        "JBL Premium Sound System",
        "Reverse Camera",
        "Launch Control",
        "Adaptive Suspension",
        "Side Slip Control",
        "Premium Leather Interior"
    ],
    "mileage": "12 km/l",
    "warranty": "3 Years Manufacturer Warranty",
    "availability": "Sold Out",
    "rating": 4.5,
    "reviewsCount": 271,
    "dealerLocation": "Ferrari Dealership - London",
    "createdAt": "2002-01-15T10:00:00.000Z",
    "updatedAt": "2026-07-15T10:00:00.000Z"
} */