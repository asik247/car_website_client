import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
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
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Custom Swiper Style */}
            <style>
                {`
                .car-slider .swiper-button-prev,
                .car-slider .swiper-button-next{
                    color:white;
                    opacity:0;
                    transition:.3s;
                    background:rgba(0,0,0,.35);
                    width:50px;
                    height:50px;
                    border-radius:999px;
                }

                .car-slider:hover .swiper-button-prev,
                .car-slider:hover .swiper-button-next{
                    opacity:1;
                }

                .car-slider .swiper-pagination-bullet{
                    background:white;
                    opacity:.7;
                }

                .car-slider .swiper-pagination-bullet-active{
                    background:white;
                    width:24px;
                    border-radius:999px;
                }
                `}
            </style>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        {car.carName}
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Premium Luxury Vehicle
                    </p>
                </div>

                <div>
                    <h2 className="text-4xl font-bold text-primary">
                        ${car.price}
                    </h2>

                    <p className="text-base-content/60">
                        Per Day
                    </p>
                </div>
            </div>

            {/* Hero Slider */}
            <div className="car-slider mb-12">
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
                    {car.imageGallery?.length > 0 ? (
                        car.imageGallery.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-[550px] object-cover rounded-3xl"
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img
                                src={car.image}
                                alt=""
                                className="w-full h-[550px] object-cover rounded-3xl"
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Description */}
                    <section className="bg-base-200 rounded-3xl p-8">
                        <h2 className="text-3xl font-bold mb-5">
                            Description
                        </h2>

                        <p className="leading-8 text-base-content/70">
                            {car.description}
                        </p>
                    </section>

                    {/* Features */}
                    <section className="bg-base-200 rounded-3xl p-8">
                        <h2 className="text-3xl font-bold mb-5">
                            Features
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {car.features?.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm"
                                >
                                    ✅ {feature}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Benefits */}
                    <section className="bg-base-200 rounded-3xl p-8">
                        <h2 className="text-3xl font-bold mb-5">
                            Why Choose Us
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <article className="bg-base-100 p-5 rounded-2xl">
                                <h3 className="font-bold text-lg">
                                    No Prepayment Required
                                </h3>

                                <p className="mt-2 text-base-content/70">
                                    Reserve your vehicle without paying upfront.
                                </p>
                            </article>

                            <article className="bg-base-100 p-5 rounded-2xl">
                                <h3 className="font-bold text-lg">
                                    High Quality Cars
                                </h3>

                                <p className="mt-2 text-base-content/70">
                                    All vehicles are inspected and certified.
                                </p>
                            </article>

                            <article className="bg-base-100 p-5 rounded-2xl">
                                <h3 className="font-bold text-lg">
                                    Trusted By Clients
                                </h3>

                                <p className="mt-2 text-base-content/70">
                                    Thousands of happy customers trust us.
                                </p>
                            </article>

                            <article className="bg-base-100 p-5 rounded-2xl">
                                <h3 className="font-bold text-lg">
                                    Free Cancellation
                                </h3>

                                <p className="mt-2 text-base-content/70">
                                    Cancel anytime without hidden fees.
                                </p>
                            </article>

                        </div>
                    </section>

                    {/* Gallery */}
                    <section>
                        <h2 className="text-3xl font-bold mb-5">
                            Gallery
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {car.imageGallery?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    className="rounded-2xl h-52 w-full object-cover hover:scale-105 duration-300 cursor-pointer"
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <div>

                    <div className="sticky top-24 space-y-6">

                        {/* Booking Card */}
                        <div className="bg-base-200 rounded-3xl p-6 shadow-xl">

                            <h2 className="text-3xl font-bold">
                                ${car.price}
                            </h2>

                            <p className="text-base-content/60 mb-6">
                                Daily Rental Price
                            </p>

                            <div className="space-y-4">

                                <div>
                                    <label className="font-medium">
                                        Pick Up Date
                                    </label>

                                    <input
                                        type="date"
                                        className="input input-bordered w-full mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Drop Off Date
                                    </label>

                                    <input
                                        type="date"
                                        className="input input-bordered w-full mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        className="input input-bordered w-full mt-2"
                                    />
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between text-lg">
                                <span>Total Price</span>

                                <span className="font-bold text-primary">
                                    ${car.price}
                                </span>
                            </div>

                            <button className="btn btn-primary w-full mt-6 rounded-xl">
                                Check Availability
                            </button>
                        </div>

                        {/* Car Card */}
                        <div className="card bg-base-200 shadow-xl">

                            <figure>
                                <img
                                    src={car.image}
                                    alt=""
                                    className="h-60 w-full object-cover"
                                />
                            </figure>

                            <div className="card-body">

                                <h2 className="card-title">
                                    {car.carName}
                                </h2>

                                <p>
                                    Premium luxury vehicle ready for your next adventure.
                                </p>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">
                                        Rent Now
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>

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