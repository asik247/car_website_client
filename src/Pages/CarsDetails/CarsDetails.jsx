import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useInstance from "../../Hooks/useInstance";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarsDetails = () => {
    const instance = useInstance();
    const { id } = useParams();

    const { data: car = {}, isLoading } = useQuery({
        queryKey: ["cars", id],
        queryFn: async () => {
            const res = await instance.get(`/cars/details/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Name + Price */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{car.carName}</h1>

                <h2 className="text-2xl font-semibold text-primary">
                    ${car.price}
                </h2>
            </div>

            {/* Car Image Slider */}
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                navigation
                loop
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >

                {
                    car.imageGallery.map((img, index) => <SwiperSlide key={index}>
                        <img
                            className="w-full h-[500px] object-cover rounded-xl"
                            src={img}
                            alt={''}
                        />
                    </SwiperSlide>)
                }
            </Swiper>
            <div className="flex justify-between items-center">
                {/* car details left side */}
                <div>
                    <section>
                        <h2>Description</h2>
                        <p>{car.description}</p>
                    </section>
                    {/* car info section */}
                    <section>
                        <h2>Car Information</h2>
                        {
                            car.features.map((feature, ind) => <li key={ind}>{feature}</li>)
                        }
                    </section>
                    {/* image gallery */}
                    <section>
                        {
                            car.imageGallery.map((img, index) => <SwiperSlide key={index}>
                                <img
                                    className="w-full h-[500px] object-cover rounded-xl"
                                    src={img}
                                    alt={''}
                                />
                            </SwiperSlide>)
                        }
                    </section>
                    <section>
                        <article>
                            <h3>No prepaypayment required</h3>
                            <p>Just provide us your Social Security Number and It’s all done</p>
                        </article>
                        <article>
                            <h3>High quality cars</h3>
                            <p>Our cars ‘re certificated by gurus who has 20+ experience years</p>
                        </article>
                        <article>
                            <h3>Trusted by 10+ clients</h3>
                            <p>We have 10k+ happy clients who love us and ready for our cars</p>
                        </article>
                        <article>
                            <h3>Free cancelation</h3>
                            <p>No extra fee, you can cancel your booking anytime</p>
                        </article>
                    </section>
                </div>
                {/* check car and leatest car here right side */}
                <div>
                    <section>
                        check car ar taka card desing thabe pick up , drup of and quentity and totla price last a check car btn thkebe.
                    </section>
                    <section>
                        <img src={car.image} alt="" />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CarsDetails;
/**{
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
} */