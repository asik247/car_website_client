import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useInstance from "../../Hooks/useInstance";
import Swal from "sweetalert2";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const CarsDetails = () => {
    const instance = useInstance();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    //! ---- Local UI state
    const [quantity, setQuantity] = useState(1);
    const [showAddToCart, setShowAddToCart] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    //? controls the cart preview modal
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");

    //! ---- Remove-confirm modal state (NEW)
    const [itemToRemove, setItemToRemove] = useState(null);
    const [isRemoving, setIsRemoving] = useState(false);

    //! ---- Cart modal ref (DaisyUI native <dialog> modal)
    const cartModalRef = useRef(null);
    //! ---- Remove-confirm modal ref (NEW)
    const removeModalRef = useRef(null);

    //Todo ---- Fetch the car being viewed
    const { data: car = {}, isLoading } = useQuery({
        queryKey: ["cars", id],
        queryFn: async () => {
            const res = await instance.get(`/cars/details/${id}`);
            return res.data;
        },
    });
    //! Fetch the card data addToCartsData
    const { data: addData = [] } = useQuery({
        queryKey: ["addToCartsData"],
        queryFn: async () => {
            const res = await instance.get("/addToCartsData");
            return res.data;
        },
    });
    console.log(addData);

    //? ---- Derived values
    const dailyRate = car.price || 0;
    const totalPrice = dailyRate * quantity;
    const today = new Date().toISOString().split("T")[0];
    const gallery = car.imageGallery?.length > 0 ? car.imageGallery : [car.image].filter(Boolean);
    const mainImage = gallery[activeImage] || car.image;

    //? ---- Cart derived values (badge count + totalssss)
    const cartItemCount = addData.length;
    const cartTotal = addData.reduce((sum, item) => {
        const qty = item.quantity || 1;
        return sum + (item.price || 0) * qty;
    }, 0);

    //Todo Loading statess
    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#F6F3ED]">
                <span className="loading loading-spinner loading-lg text-[#C9A15B]"></span>
            </div>
        );
    }

    //? Checked Availabilityss..
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

    /** Add To Carts */
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

        instance
            .post("/addToCartsData", cartData)
            .then((res) => {
                console.log(res.data);
                queryClient.invalidateQueries({ queryKey: ["addToCartsData"] });
                Swal.fire({
                    icon: "success",
                    title: "Added to cart",
                    text: `${car.carName} has been added to your cart.`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Could not add this item to your cart. Please try again.",
                    confirmButtonColor: "#C9A15B",
                });
            });
    };

    //Todo ---- Open / close the cart modal
    const openCart = () => cartModalRef.current?.showModal();
    const closeCart = () => cartModalRef.current?.close();

    //Todo ---- Open the remove-confirm modal (replaces the old SweetAlert confirm)
    // FIX: previously this fired a SweetAlert *on top of* the cart modal, which
    // looked broken and never actually invalidated the cart query on success.
    const handleRemoveFromCart = (item) => {
        setItemToRemove(item);
        removeModalRef.current?.showModal();
    };

    const closeRemoveModal = () => {
        removeModalRef.current?.close();
        setItemToRemove(null);
    };

    //Todo ---- Actually perform the delete once confirmedssss
    const confirmRemoveItem = () => {
        if (!itemToRemove?._id) return;

        setIsRemoving(true);

        instance
            .delete(`/addToCartsData/${itemToRemove._id}`)
            .then((res) => {
                console.log(res.data);
                // FIX: this was missing before — cart list never refreshed after delete
                queryClient.invalidateQueries({ queryKey: ["addToCartsData"] });

                closeRemoveModal();

                Swal.fire({
                    icon: "success",
                    title: "Removed",
                    text: `${itemToRemove.carName} was removed from your cart.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Could not remove this item. Please try again.",
                    confirmButtonColor: "#C9A15B",
                });
            })
            .finally(() => setIsRemoving(false));
    };

    //Todo ---- Checkout handler (wire this up to your real checkout flowsss)
    const handleCheckout = (addData) => {

        const data = {
            carName: addData.carName
,
            carId: addData.carId,
            price: addData.price,
        }
        console.log(data);



    };

    const TABS = [
        { key: "overview", label: "Overview" },
        { key: "features", label: "Features" },
        { key: "why", label: "Why Us" },
    ];

    return (
        <div className="min-h-screen font-['Manrope',sans-serif]">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');`}
            </style>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-28">
                {/*BREADCRUMB + CART ICON  */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-[0.78rem]">
                        <button onClick={() => navigate("/")} className="hover:text-[#8A6B23] transition-colors">
                            Home
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate(-1)} className="hover:text-[#8A6B23] transition-colors">
                            Cars
                        </button>
                        <span>/</span>
                        <span className=" font-medium truncate max-w-[200px]">{car.carName}</span>
                    </div>

                    {/* ---- Cart trigger icon ---- */}
                    <button
                        onClick={openCart}
                        aria-label="Open cart"
                        className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#E9E3D6] hover:border-[#C9A15B]  transition-colors duration-200"
                    >
                        <FaShoppingCart className=" text-lg" />

                        {cartItemCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#C9A15B] text-white text-[0.68rem] font-bold font-['Space_Mono',monospace] shadow-sm">
                                {cartItemCount > 99 ? "99+" : cartItemCount}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid md:grid-cols-[88px_1fr] gap-4 mb-10">
                    {/* Thumbnail rail */}
                    <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
                        {gallery.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`flex-shrink-0 w-20 h-20 md:w-full md:h-20 rounded-xl overflow-hidden border-2 transition-colors duration-200 ${activeImage === index ? "border-[#C9A15B]" : "border-transparent"
                                    }`}
                            >
                                <img src={img} alt={`${car.carName} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="order-1 md:order-2 group relative overflow-hidden rounded-3xl border border-[#E9E3D6]">
                        <img
                            src={mainImage}
                            alt={car.carName}
                            className="w-full h-[340px] md:h-[520px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 uppercase tracking-[0.18em] text-[0.65rem] font-bold rounded-full px-3 py-1.5">
                            Verified Fleet
                        </span>
                    </div>
                </div>

                {/* Left + Right Parent */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left side */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <p className="uppercase tracking-[0.22em] text-[0.72rem] font-bold text-[#8A6B23] mb-2">
                                Premium Rental
                            </p>
                            <h1 className="font-['Fraunces',serif] text-3xl md:text-4xl font-semibold leading-tight ">
                                {car.carName}
                            </h1>
                        </div>

                        {/* Tab bar */}
                        <div className="border-b border-[#E9E3D6] flex gap-6">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative pb-3 text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${activeTab === tab.key ? "" : " hover:text-[#4A4E57]"
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.key && (
                                        <span className="absolute left-0 right-0 -bottom-px h-[2px]  rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab panels */}
                        <div className=" rounded-3xl p-7 md:p-8 border border-[#E9E3D6]">
                            {activeTab === "overview" && (
                                <div>
                                    <h2 className="font-['Fraunces',serif] text-2xl font-semibold  mb-4">About This Vehicle</h2>
                                    <p className="leading-8 ">{car.description}</p>
                                </div>
                            )}

                            {activeTab === "features" && (
                                <div>
                                    <h2 className="font-['Fraunces',serif] text-2xl font-semibold text-[#14161A] mb-5">
                                        What's Included
                                    </h2>
                                    {car.features?.length > 0 ? (
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {car.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3  border border-[#E9E3D6] rounded-2xl px-4 py-3.5">
                                                    <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full   flex items-center justify-center">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M20 6L9 17l-5-5"
                                                                stroke="currentColor"
                                                                strokeWidth="3"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <span className=" font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className=" text-sm">No feature list provided for this vehicle.</p>
                                    )}
                                </div>
                            )}

                            {activeTab === "why" && (
                                <div>
                                    <h2 className="font-['Fraunces',serif] text-2xl font-semibold  mb-5">Why Rent With Us</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            { title: "No Prepayment Required", body: "Reserve your vehicle without paying upfront." },
                                            { title: "High Quality Cars", body: "Every vehicle is inspected and certified before pickup." },
                                            { title: "Trusted By Clients", body: "Thousands of happy customers rent with us every month." },
                                            { title: "Free Cancellation", body: "Cancel anytime, no hidden fees, no questions asked." },
                                        ].map((item, i) => (
                                            <article key={i} className="border border-[#E9E3D6] rounded-2xl p-5">
                                                <h3 className="font-semibold ">{item.title}</h3>
                                                <p className="mt-2  text-sm leading-6">{item.body}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {gallery.length > 1 && (
                            <section>
                                <p className="uppercase tracking-[0.22em] text-[0.72rem] font-bold  mb-2">Gallery</p>
                                <h2 className="font-['Fraunces',serif] text-2xl font-semibold  mb-5">More Views</h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {gallery.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setActiveImage(index);
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                            className="group relative overflow-hidden rounded-2xl text-left"
                                        >
                                            <img
                                                src={img}
                                                alt={`${car.carName} ${index + 1}`}
                                                className="h-52 w-full object-cover cursor-pointer transition-transform duration-500 ease-out group-hover:scale-110"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#14161A]/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="lg:sticky lg:top-24 space-y-4">
                        {/* Buy box */}
                        <div className="rounded-3xl border border-[#E9E3D6] p-7">
                            <div className="flex items-end justify-between mb-1">
                                <p className="uppercase tracking-[0.14em] text-[0.65rem] font-bold ">Per Day</p>
                                <span className="relative flex h-2 w-2">
                                    {showAddToCart && (
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full  opacity-75" />
                                    )}
                                    <span className={`relative inline-flex h-2 w-2 rounded-full ${showAddToCart ? "" : ""}`} />
                                </span>
                            </div>
                            <p className="font-['Space_Mono',monospace] text-3xl font-bold tracking-[0.02em]  [font-variant-numeric:tabular-nums]">
                                ৳{dailyRate.toLocaleString()}
                            </p>

                            <div className="h-px  my-5" />

                            <div className="space-y-4">
                                {/* Pick-up date */}
                                <div>
                                    <label className="block uppercase tracking-[0.14em] text-[0.65rem] font-bold  mb-1.5">Pick Up</label>
                                    <input
                                        type="date"
                                        min={today}
                                        value={pickupDate}
                                        onChange={(e) => {
                                            setPickupDate(e.target.value);
                                            setShowAddToCart(false);
                                        }}
                                        className="w-full border border-[#E9E3D6] rounded-xl px-3 py-2.5 outline-none font-semibold transition-colors duration-200 focus:border-[#C9A15B]"
                                    />
                                </div>

                                {/* Drop-off date */}
                                <div>
                                    <label className="block uppercase tracking-[0.14em] text-[0.65rem] font-bold  mb-1.5">Drop Off</label>
                                    <input
                                        type="date"
                                        min={pickupDate || today}
                                        value={dropoffDate}
                                        onChange={(e) => {
                                            setDropoffDate(e.target.value);
                                            setShowAddToCart(false);
                                        }}
                                        className="w-full  border border-[#E9E3D6] rounded-xl  px-3 py-2.5 outline-none font-semibold transition-colors duration-200 focus:border-[#C9A15B]"
                                    />
                                </div>

                                {/* Quantity stepper */}
                                <div>
                                    <label className="block uppercase tracking-[0.14em] text-[0.65rem] font-bold  mb-1.5">Quantity</label>
                                    <div className="flex items-center border border-[#E9E3D6] rounded-xl overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setQuantity((q) => Math.max(1, q - 1));
                                                setShowAddToCart(false);
                                            }}
                                            className="w-10 h-11 flex items-center justify-center  font-bold hover:bg-[#EFE8D6] transition-colors"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => {
                                                setQuantity(Math.max(1, Number(e.target.value)));
                                                setShowAddToCart(false);
                                            }}
                                            className="flex-1 bg-transparent text-center outline-none font-semibold "
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setQuantity((q) => q + 1);
                                                setShowAddToCart(false);
                                            }}
                                            className="w-10 h-11 flex items-center justify-center  font-bold hover:bg-[#EFE8D6] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px  my-5" />

                            <div className="flex items-baseline justify-between mb-5">
                                <span className="uppercase tracking-[0.14em] text-[0.65rem] font-bold ">Estimated Total</span>
                                <span className="font-['Space_Mono',monospace] text-xl font-bold ">৳{totalPrice.toLocaleString()}</span>
                            </div>

                            {/* Primary CTA — swaps label/behaviour once availability is confirmed */}
                            {!showAddToCart ? (
                                <button
                                    onClick={handleCheckAvailability}
                                    className="w-full py-3.5 rounded-2xl font-bold  transition-colors duration-200 bg-primary"
                                >
                                    Check Availability
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3.5 rounded-2xl  font-bold t transition-colors duration-200 bg-primary"
                                >
                                    Add To Cart
                                </button>
                            )}
                        </div>

                        {/* Trust badges */}
                        <div className=" rounded-3xl border border-[#E9E3D6] divide-y divide-[#E9E3D6]">
                            {[
                                { label: "No prepayment required", icon: "M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" },
                                { label: "Free cancellation anytime", icon: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
                                { label: "Inspected & certified fleet", icon: "M20 6L9 17l-5-5" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 ">
                                        <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-sm  font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Cart Modal (DaisyUI native <dialog>) ---- */}
            <dialog ref={cartModalRef} className="modal">
                <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-3xl font-['Manrope',sans-serif]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 ">
                        <div>
                            <p className="uppercase tracking-[0.18em] text-[0.65rem] font-bold  mb-1">Your Selection</p>
                            <h3 className="font-['Fraunces',serif] text-xl font-semibold ]">
                                Shopping Cart{" "}
                                <span className=" text-base font-medium">
                                    ({cartItemCount} {cartItemCount === 1 ? "item" : "items"})
                                </span>
                            </h3>
                        </div>
                        <button
                            onClick={closeCart}
                            className="w-9 h-9  cursor-pointer flex items-center justify-center rounded-full  transition-colors "
                            aria-label="Close cart"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="max-h-[55vh] overflow-y-auto px-6 py-4">
                        {cartItemCount === 0 ? (
                            <div className="py-16 text-center">
                                <FaShoppingCart className="mx-auto text-4xl  mb-3" />
                                <p className="font-['Fraunces',serif] text-lg font-semibold ">Your cart is empty</p>
                                <p className="text-sm ] mt-1">Browse our fleet and add a vehicle to get started.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-[#E9E3D6]">
                                {addData.map((item) => {
                                    const qty = item.quantity || 1;
                                    const subtotal = (item.price || 0) * qty;

                                    return (
                                        <li key={item._id} className="flex gap-4 py-4">
                                            <img
                                                src={item.image}
                                                alt={item.carName}
                                                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold  truncate">{item.carName}</h4>
                                                        <p className="text-xs  mt-0.5">
                                                            {item.pickupDate && item.dropoffDate
                                                                ? `${item.pickupDate} → ${item.dropoffDate}`
                                                                : "Dates not specified"}
                                                        </p>
                                                    </div>

                                                    {/* FIX: now opens the styled confirm modal instead of a stacked SweetAlert */}
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item)}
                                                        className="flex-shrink-0  cursor-pointer w-8 h-8 flex items-center justify-center rounded-full   transition-colors"
                                                        aria-label={`Remove ${item.carName}`}
                                                    >
                                                        <FaTrashAlt className="text-sm" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-2.5">
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className="">৳{(item.price || 0).toLocaleString()} / day</span>
                                                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full border  text-xs font-semibold ">
                                                            Qty: {qty}
                                                        </span>
                                                    </div>
                                                    <span className="font-['Space_Mono',monospace] font-bold ">
                                                        ৳{subtotal.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItemCount > 0 && (
                        <div className="border-t  px-6 py-5">
                            <div className="flex items-baseline justify-between mb-4">
                                <span className="uppercase tracking-[0.14em] text-[0.7rem] font-bold ">Total</span>
                                <span className="font-['Space_Mono',monospace] text-2xl font-bold ">
                                    ৳{cartTotal.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={closeCart}
                                    className="flex-1 bg-primary cursor-pointer py-3 rounded-2xl font-semibold border  transition-colors"
                                >
                                    Continue Browsing
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    className="flex-1 bg-primary cursor-pointer py-3 rounded-2xl font-bold  transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Click-outside-to-close backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* ---- Remove-Confirm Modal (NEW) ---- */}
            <dialog ref={removeModalRef} className="modal" onClose={() => setItemToRemove(null)}>
                <div className="modal-box max-w-sm p-0 overflow-hidden rounded-3xl font-['Manrope',sans-serif]">
                    <div className="px-6 pt-7 pb-2 text-center">
                        <div className="mx-auto w-14 h-14 rounded-full  flex items-center justify-center mb-4">
                            <FaTrashAlt className="text-xl " />
                        </div>
                        <h3 className="font-['Fraunces',serif] text-xl font-semibold  mb-1.5">Remove item?</h3>
                        {itemToRemove && (
                            <p className="text-sm text-[#7A7E87] leading-6">
                                Remove <span className="font-semibold ">{itemToRemove.carName}</span> from your
                                cart? This can't be undone.
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 px-6 py-6">
                        <button
                            onClick={closeRemoveModal}
                            disabled={isRemoving}
                            className="flex-1  cursor-pointer py-3 rounded-2xl font-semibold border border-[#E9E3D6]   transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmRemoveItem}
                            disabled={isRemoving}
                            className="flex-1 cursor-pointer py-3 rounded-2xl font-bold text-white bg-[#B3453F] hover:bg-[#9C3A35] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {isRemoving ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                "Remove"
                            )}
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default CarsDetails;