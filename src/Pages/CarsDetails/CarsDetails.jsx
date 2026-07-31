import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useInstance from "../../Hooks/useInstance";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from "sweetalert2";

const CART_KEY = "carRentalCart";

const CarsDetails = () => {
    const instance = useInstance();
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [showAddToCart, setShowAddToCart] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");

    const { data: car = {}, isLoading } = useQuery({
        queryKey: ["cars", id],
        queryFn: async () => {
            const res = await instance.get(`/cars/details/${id}`);
            return res.data;
        },
    });

    const dailyRate = car.price || 0;
    const totalPrice = dailyRate * quantity;
    const today = new Date().toISOString().split("T")[0];

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#F6F3ED]">
                <span className="loading loading-spinner loading-lg text-[#C9A15B]"></span>
            </div>
        );
    }

    const handleCheckAvailability = () => {
        if (!pickupDate || !dropoffDate) {
            Swal.fire({
                icon: "error",
                title: "Missing dates",
                text: "Select a pick-up and drop-off date to continue.",
                confirmButtonColor: "#C9A15B",
            });
            return;
        }

        if (new Date(dropoffDate) <= new Date(pickupDate)) {
            Swal.fire({
                icon: "error",
                title: "Invalid date range",
                text: "Drop-off date must be after the pick-up date.",
                confirmButtonColor: "#C9A15B",
            });
            return;
        }

        if (quantity < 1) {
            Swal.fire({
                icon: "error",
                title: "Invalid quantity",
                text: "Quantity must be at least 1.",
                confirmButtonColor: "#C9A15B",
            });
            return;
        }

        setShowAddToCart(true);

        Swal.fire({
            icon: "success",
            title: "Available",
            text: "This vehicle is free for your selected dates.",
            timer: 1400,
            showConfirmButton: false,
        });
    };

    const handleAddToCart = () => {
        const cartData = {
            carId: car._id,
            carName: car.carName,
            image: car.image,
            price: dailyRate,
            quantity,
            pickupDate,
            dropoffDate,
            totalPrice,
            addedAt: new Date().toISOString(),
        };

        // Persisted locally for now — swap for a POST to /cart once the
        // backend endpoint is ready (see commented example below).
        const existingCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        existingCart.push(cartData);
        localStorage.setItem(CART_KEY, JSON.stringify(existingCart));

        // instance.post("/cart", cartData).then(res => console.log(res.data));

        Swal.fire({
            icon: "success",
            title: "Added to cart",
            text: `${car.carName} is waiting for you in the cart.`,
            confirmButtonText: "View Cart",
            showCancelButton: true,
            cancelButtonText: "Keep Browsing",
            confirmButtonColor: "#C9A15B",
            cancelButtonColor: "#23262B",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/cart");
            }
        });
    };

    return (
        <div className=" min-h-screen">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

                .cd-root, .cd-root * { font-family: 'Manrope', sans-serif; }
                .cd-display { font-family: 'Fraunces', serif; }
                .cd-mono { font-family: 'Space Mono', monospace; }

                .cd-eyebrow{
                    letter-spacing:.22em;
                    text-transform:uppercase;
                    font-size:.72rem;
                    font-weight:700;
                }

                .cd-hairline{
                    height:1px;
                    background:linear-gradient(90deg, rgba(201,161,91,.7), rgba(201,161,91,0));
                }

                /* Hero slider */
                .car-slider .swiper-button-prev,
                .car-slider .swiper-button-next{
                    color:#F6F3ED;
                    opacity:0;
                    transition:.3s;
                    background:rgba(20,22,26,.45);
                    width:46px;
                    height:46px;
                    border-radius:999px;
                }
                .car-slider .swiper-button-prev:after,
                .car-slider .swiper-button-next:after{ font-size:16px; }
                .car-slider:hover .swiper-button-prev,
                .car-slider:hover .swiper-button-next{ opacity:1; }
                .car-slider .swiper-pagination-bullet{ background:#F6F3ED; opacity:.6; }
                .car-slider .swiper-pagination-bullet-active{ background:#C9A15B; width:22px; border-radius:999px; opacity:1; }

                /* Trip computer panel */
                .trip-computer{
                    background:#14161A;
                    border-radius:28px;
                    position:relative;
                    overflow:hidden;
                }
                .trip-computer:before{
                    content:"";
                    position:absolute;
                    inset:0;
                    background:radial-gradient(circle at 15% 0%, rgba(201,161,91,.16), transparent 55%);
                    pointer-events:none;
                }
                .trip-readout{
                    text-shadow:0 0 18px rgba(201,161,91,.55);
                    letter-spacing:.03em;
                    font-variant-numeric: tabular-nums;
                }
                .trip-field label{
                    color:#8A8F98;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                    font-size:.65rem;
                    font-weight:700;
                }
                .trip-field input{
                    background:transparent;
                    border:none;
                    border-bottom:1px solid rgba(255,255,255,.14);
                    color:#F6F3ED;
                    padding:8px 2px;
                    width:100%;
                    outline:none;
                    font-weight:600;
                    transition:.2s;
                }
                .trip-field input:focus{ border-bottom-color:#C9A15B; }
                .trip-field input::-webkit-calendar-picker-indicator{ filter:invert(1); opacity:.7; cursor:pointer; }

                .status-dot{
                    width:8px; height:8px; border-radius:999px;
                    background:#5C6068;
                }
                .status-dot.live{
                    background:#6FA287;
                    box-shadow:0 0 0 0 rgba(111,162,135,.6);
                    animation:pulse 1.8s infinite;
                }
                @keyframes pulse{
                    0%{ box-shadow:0 0 0 0 rgba(111,162,135,.55); }
                    70%{ box-shadow:0 0 0 8px rgba(111,162,135,0); }
                    100%{ box-shadow:0 0 0 0 rgba(111,162,135,0); }
                }

                .cd-btn-primary{
                    background:#C9A15B;
                    color:#14161A;
                    font-weight:700;
                    border-radius:14px;
                    transition:.2s;
                }
                .cd-btn-primary:hover{ background:#DCB876; }

                .cd-btn-ghost{
                    background:transparent;
                    border:1px solid rgba(255,255,255,.18);
                    color:#F6F3ED;
                    font-weight:700;
                    border-radius:14px;
                    transition:.2s;
                }
                .cd-btn-ghost:hover{ border-color:#C9A15B; color:#C9A15B; }

                .feature-chip{
                    display:flex; align-items:center; gap:12px;
                    background:#FFFFFF;
                    border:1px solid #E9E3D6;
                    border-radius:16px;
                    padding:14px 16px;
                }
                .feature-check{
                    flex-shrink:0;
                    width:26px; height:26px;
                    border-radius:999px;
                    background:#F1E4C8;
                    color:#8A6B23;
                    display:flex; align-items:center; justify-content:center;
                }

                .gallery-tile{ position:relative; overflow:hidden; border-radius:18px; }
                .gallery-tile img{ transition:transform .5s ease; }
                .gallery-tile:hover img{ transform:scale(1.08); }
                .gallery-tile:after{
                    content:"";
                    position:absolute; inset:0;
                    background:linear-gradient(180deg, transparent 55%, rgba(20,22,26,.55));
                    opacity:0; transition:.3s;
                }
                .gallery-tile:hover:after{ opacity:1; }
                `}
            </style>

            <div className="cd-root max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <p className="cd-eyebrow  mb-3">Premium Rental &middot; Verified Fleet</p>
                        <h1 className="cd-display text-4xl md:text-5xl font-semibold  leading-tight">
                            {car.carName}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3  rounded-2xl px-5 py-3">
                        <div className="text-right">
                            <p className="cd-mono text-2xl  trip-readout">
                                ৳{dailyRate.toLocaleString()}
                            </p>
                            <p className="cd-eyebrow text-[#8A8F98] mt-0.5">Per Day</p>
                        </div>
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
                                        alt={car.carName}
                                        className="w-full h-[420px] md:h-[550px] object-cover rounded-3xl"
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <img
                                    src={car.image}
                                    alt={car.carName}
                                    className="w-full h-[420px] md:h-[550px] object-cover rounded-3xl"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Description */}
                        <section className="bg-white rounded-3xl p-7 md:p-8 border border-[#E9E3D6]">
                            <p className="cd-eyebrow text-[#8A6B23] mb-2">Overview</p>
                            <h2 className="cd-display text-2xl md:text-3xl font-semibold text-[#14161A] mb-4">
                                About This Vehicle
                            </h2>
                            <p className="leading-8 text-[#4A4E57]">
                                {car.description}
                            </p>
                        </section>

                        {/* Features */}
                        {car.features?.length > 0 && (
                            <section className="bg-white rounded-3xl p-7 md:p-8 border border-[#E9E3D6]">
                                <p className="cd-eyebrow text-[#8A6B23] mb-2">Included</p>
                                <h2 className="cd-display text-2xl md:text-3xl font-semibold text-[#14161A] mb-5">
                                    Features
                                </h2>

                                <div className="grid md:grid-cols-2 gap-3">
                                    {car.features.map((feature, index) => (
                                        <div key={index} className="feature-chip">
                                            <span className="feature-check">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span className="text-[#23262B] font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Benefits */}
                        <section className="bg-[#14161A] rounded-3xl p-7 md:p-8">
                            <p className="cd-eyebrow text-[#C9A15B] mb-2">Our Promise</p>
                            <h2 className="cd-display text-2xl md:text-3xl font-semibold text-white mb-6">
                                Why Rent With Us
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: "No Prepayment Required", body: "Reserve your vehicle without paying upfront." },
                                    { title: "High Quality Cars", body: "Every vehicle is inspected and certified before pickup." },
                                    { title: "Trusted By Clients", body: "Thousands of happy customers rent with us every month." },
                                    { title: "Free Cancellation", body: "Cancel anytime, no hidden fees, no questions asked." },
                                ].map((item, i) => (
                                    <article key={i} className="border border-white/10 rounded-2xl p-5">
                                        <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                                        <p className="mt-2 text-[#9CA0A8] text-sm leading-6">{item.body}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* Gallery */}
                        {car.imageGallery?.length > 0 && (
                            <section>
                                <p className="cd-eyebrow text-[#8A6B23] mb-2">Gallery</p>
                                <h2 className="cd-display text-2xl md:text-3xl font-semibold text-[#14161A] mb-5">
                                    More Views
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {car.imageGallery.map((img, index) => (
                                        <div key={index} className="gallery-tile">
                                            <img
                                                src={img}
                                                alt={`${car.carName} ${index + 1}`}
                                                className="h-52 w-full object-cover cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT — sticky column */}
                    <div className="sticky top-24 space-y-6">

                        {/* Trip Computer / Booking Panel */}
                        <div className="trip-computer p-7">
                            <div className="relative flex items-center justify-between mb-1">
                                <p className="cd-eyebrow text-[#8A8F98]">Trip Computer</p>
                                <span className={`status-dot ${showAddToCart ? "live" : ""}`}></span>
                            </div>

                            <p className="cd-mono trip-readout text-4xl text-[#C9A15B] font-bold relative">
                                ৳{totalPrice.toLocaleString()}
                            </p>
                            <p className="cd-eyebrow text-[#8A8F98] mb-6 relative">Estimated Total</p>

                            <div className="cd-hairline mb-6"></div>

                            <div className="space-y-5 relative">
                                <div className="trip-field">
                                    <label>Pick Up</label>
                                    <input
                                        type="date"
                                        min={today}
                                        value={pickupDate}
                                        onChange={(e) => {
                                            setPickupDate(e.target.value);
                                            setShowAddToCart(false);
                                        }}
                                    />
                                </div>

                                <div className="trip-field">
                                    <label>Drop Off</label>
                                    <input
                                        type="date"
                                        min={pickupDate || today}
                                        value={dropoffDate}
                                        onChange={(e) => {
                                            setDropoffDate(e.target.value);
                                            setShowAddToCart(false);
                                        }}
                                    />
                                </div>

                                <div className="trip-field">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(Math.max(1, Number(e.target.value)));
                                            setShowAddToCart(false);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="cd-hairline my-6"></div>

                            <div className="relative space-y-3">
                                {!showAddToCart ? (
                                    <button
                                        onClick={handleCheckAvailability}
                                        className="cd-btn-primary w-full py-3.5"
                                    >
                                        Check Availability
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleAddToCart}
                                            className="cd-btn-primary w-full py-3.5"
                                        >
                                            Add To Cart
                                        </button>
                                        <button
                                            onClick={() => setShowAddToCart(false)}
                                            className="cd-btn-ghost w-full py-3"
                                        >
                                            Edit Dates
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Car Summary Card */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-[#E9E3D6]">
                            <img
                                src={car.image}
                                alt={car.carName}
                                className="h-52 w-full object-cover"
                            />
                            <div className="p-6">
                                <h2 className="cd-display text-xl font-semibold text-[#14161A]">
                                    {car.carName}
                                </h2>
                                <p className="text-[#6B6F78] text-sm mt-2 leading-6">
                                    Premium luxury vehicle, ready for your next journey.
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="cd-btn-primary w-full py-3 mt-5"
                                >
                                    Back To Top
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarsDetails;



/**gallery img gullo click korel full show korebe and ar nise add to cart btn and icon thake jekhee ay detial ar inof card hoy show kore clik korele dakte pabo and view detals and checkout page sow korbe ... https://demo1.leotheme.com/leo_rent_car_demo/en/type/1-hummingbird-printed-t-shirt.html ay webiste ar moto ... please kore dao */




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