import React from "react";
import { motion } from "framer-motion";

import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const slides = [
    {
        id: 1,
        title: "Drive Your Dream Car Today",
        description:
            "Premium cars at unbeatable prices. Explore our collection and find the perfect ride for your next journey.",
        image: hero1,
    },
    {
        id: 2,
        title: "Luxury Meets Performance",
        description:
            "Experience unmatched comfort, style, and power with our premium vehicle collection.",
        image: hero2,
    },
    {
        id: 3,
        title: "Find The Perfect Ride",
        description:
            "From family SUVs to luxury sedans, we have the ideal vehicle for every lifestyle.",
        image: hero3,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const stats = [
    { value: "500+", label: "Available Cars" },
    { value: "10K+", label: "Happy Customers" },
    { value: "24/7", label: "Support" },
];

const Hero1 = () => {
    return (
        <section className="w-full bg-base-100 p-3 sm:p-4 lg:p-6 group">
            {/*
                Scoped overrides for Swiper's default pagination/navigation so
                they match the site's palette instead of Swiper's stock blue.
                Kept local via a wrapper class to avoid leaking global styles.
            */}
            <style>{`
                .hero-swiper .swiper-pagination {
                    bottom: 14px !important;
                }
                .hero-swiper .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.55);
                    opacity: 1;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    transition: all 0.25s ease;
                    cursor: pointer;
                }
                .hero-swiper .swiper-pagination-bullet-active {
                    width: 26px;
                    border-radius: 9999px;
                    background: hsl(var(--p));
                }
                .hero-swiper .swiper-button-prev,
                .hero-swiper .swiper-button-next {
                    display: none;
                }
                @media (min-width: 640px) {
                    .hero-swiper .swiper-pagination {
                        bottom: 18px !important;
                    }
                    .hero-swiper .swiper-pagination-bullet {
                        width: 10px;
                        height: 10px;
                    }
                    .hero-swiper .swiper-pagination-bullet-active {
                        width: 28px;
                    }
                }
                @media (min-width: 1024px) {
                    .hero-swiper .swiper-pagination {
                        bottom: 24px !important;
                    }
                    .hero-swiper .swiper-button-prev,
                    .hero-swiper .swiper-button-next {
                        display: flex;
                    }
                }
            `}</style>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: ".hero-prev",
                    nextEl: ".hero-next",
                }}
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                className="hero-swiper rounded-2xl lg:rounded-3xl relative overflow-hidden"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="max-w-7xl mx-auto min-h-fit lg:min-h-[85vh] px-4 sm:px-8 lg:px-0 py-10 lg:py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12">

                            {/* Left Content */}
                            <motion.div
                                className="flex-1 space-y-5 lg:space-y-6 text-center lg:text-left"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                            >
                                <motion.span
                                    variants={itemVariants}
                                    className="badge badge-outline badge-lg border-primary/40 text-primary font-medium"
                                >
                                    🚗 Premium Car Collection
                                </motion.span>

                                <motion.h1
                                    variants={itemVariants}
                                    className="text-[2.25rem] leading-[1.12] sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-7xl font-bold tracking-tight text-base-content text-balance"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                                >
                                    {slide.description}
                                </motion.p>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
                                >
                                    <button className="btn btn-primary btn-md sm:btn-lg shadow-lg shadow-primary/20">
                                        Explore Cars
                                    </button>

                                    <button className="btn btn-outline btn-md sm:btn-lg border-base-content/20 text-base-content hover:bg-base-content hover:text-base-100">
                                        Book Test Drive
                                    </button>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-6 border-t border-base-content/10 mt-2"
                                >
                                    {stats.map((stat) => (
                                        <div key={stat.label}>
                                            <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                                                {stat.value}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-base-content/60 whitespace-nowrap">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right Image */}
                            <motion.div
                                className="flex-1 w-full max-w-md lg:max-w-none"
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-base-content/10 bg-base-200">
                                    <motion.img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        animate={{
                                            y: [0, -12, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    {/* subtle depth overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom navigation arrows: desktop only, revealed on hero hover */}
                <button
                    aria-label="Previous slide"
                    className="hero-prev cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10 items-center justify-center w-11 h-11 rounded-full bg-base-100/90 shadow-md border border-base-content/10 hover:bg-base-100 hover:scale-105 transition-all duration-300 hidden lg:flex"
                >
                    <BiChevronLeft className="w-6 h-6 text-base-content" />
                </button>
                <button
                    aria-label="Next slide"
                    className="hero-next cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10 items-center justify-center w-11 h-11 rounded-full bg-base-100/90 shadow-md border border-base-content/10 hover:bg-base-100 hover:scale-105 transition-all duration-300 hidden lg:flex"
                >
                    <BiChevronRight className="w-6 h-6 text-base-content" />
                </button>
            </Swiper>
        </section>
    );
};

export default Hero1;