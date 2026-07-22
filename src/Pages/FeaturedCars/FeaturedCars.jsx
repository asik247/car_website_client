import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useInstance from '../../Hooks/useInstance';
import { Link } from 'react-router';

const CATEGORIES = [ 'Hybrid Hypercar','Grand Tourer',  'Sports Car'];

const FeaturedCars = () => {
    const instance = useInstance();
    const [category, setCategory] = useState('');
    console.log(category);

    //! tanstack query, fetch cars from db, refetches whenever category changes
    const { data: cars = [], isLoading, error } = useQuery({
        queryKey: ['cars', category],
        queryFn: async () => {
            const res = await instance.get(`/cars?category=${category}`);
            return res.data;
        },
    });

    return (
        <div className="w-full px-6">
            {/* header + category filter */}
            <div className="w-full my-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        Featured Cars <span className="text-primary">({cars.length})</span>
                    </h1>
                    <p className="text-gray-400">you may fall in love</p>
                </div>

                {/* categories */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {CATEGORIES.map((cat) => {
                        const value = cat === 'Hybrid Hypercar' ? '' : cat;
                        const isActive = category === value;
                        return (
                            <button
                                key={cat}
                                onClick={() => setCategory(value)}
                                className={`btn btn-sm sm:btn-md rounded-full transition-colors ${
                                    isActive ? 'btn-primary' : 'btn-ghost border border-base-300'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* loading state */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="card bg-base-100 shadow-sm animate-pulse">
                            <div className="aspect-video bg-base-300 rounded-t-2xl" />
                            <div className="card-body gap-3">
                                <div className="h-4 w-1/2 bg-base-300 rounded" />
                                <div className="h-5 w-2/3 bg-base-300 rounded" />
                                <div className="h-4 w-1/3 bg-base-300 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* error state */}
            {!isLoading && error && (
                <p className="text-center text-error py-16">
                    Something went wrong: {error.message}
                </p>
            )}

            {/* empty state */}
            {!isLoading && !error && cars.length === 0 && (
                <p className="text-center text-gray-400 py-16">
                    No cars found in this category yet.
                </p>
            )}

            {/* cars grid: 3 cols desktop -> 1 col mobile */}
            {!isLoading && !error && cars.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                    {cars.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CarCard = ({ car }) => {
    const gallery = car.imageGallery?.length ? car.imageGallery : [car.image];
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const startCycling = () => {
        if (gallery.length <= 1) return;
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % gallery.length);
        }, 900);
    };

    const stopCycling = () => {
        clearInterval(intervalRef.current);
        setActiveIndex(0);
    };

    return (
        <Link to={`/carsDetails/${car._id}`}>
            <div
                onMouseEnter={startCycling}
                onMouseLeave={stopCycling}
                className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl overflow-hidden
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
            >
                {/* image gallery, crossfades smoothly on hover */}
                <figure className="relative aspect-video overflow-hidden bg-base-200">
                    {gallery.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={car.carName}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                                idx === activeIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}

                    {/* category badge */}
                    <span className="absolute top-3 left-3 badge badge-neutral bg-black/60 border-none backdrop-blur-sm text-xs">
                        {car.category}
                    </span>

                    {/* availability badge */}
                    {car.availability && (
                        <span
                            className={`absolute top-3 right-3 badge border-none text-xs ${
                                car.availability === 'Sold Out'
                                    ? 'badge-error text-white'
                                    : 'badge-success text-white'
                            }`}
                        >
                            {car.availability}
                        </span>
                    )}

                    {/* gallery dots */}
                    {gallery.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {gallery.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`h-1.5 rounded-full bg-white/90 transition-all duration-300 ${
                                        idx === activeIndex ? 'w-4' : 'w-1.5 bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </figure>

                {/* car info */}
                <div className="card-body p-5">
                    <h2 className="card-title text-lg leading-tight">{car.carName}</h2>

                    <p className="text-primary font-semibold text-xl">
                        ৳ {Number(car.price).toLocaleString()}
                    </p>

                    {/* quick spec row */}
                    <div className="grid grid-cols-3 gap-2 mt-1 border-t border-base-200 pt-3">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Year</span>
                            <span className="font-medium text-sm">{car.carInformation?.modelYear}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Power</span>
                            <span className="font-medium text-sm">{car.carInformation?.horsepower}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Top Speed</span>
                            <span className="font-medium text-sm">{car.carInformation?.topSpeed}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                        <span>{car.mileage}</span>
                        <span className="flex items-center gap-1 text-warning">
                            ★ {car.rating}
                            <span className="text-gray-400">({car.reviewsCount})</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedCars;