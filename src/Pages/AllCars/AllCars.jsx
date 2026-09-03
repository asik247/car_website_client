import { useQuery } from '@tanstack/react-query';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import useInstanceScure from '../../Hooks/useInstanceScure';

// ইন্ডিভিজুয়াল কার্ড কম্পোনেন্ট (স্মুথ ইমেজ সাইক্লিং সহ)
const CarCard = ({ car }) => {
  // ডাটাবেসে gallery অ্যারে থাকলে সেটা নিবে, নাহলে car.image বা একটি প্লেসহোল্ডার
  const gallery =
    car?.gallery && car.gallery.length > 0
      ? car.gallery
      : [car?.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'];

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const startCycling = () => {
    if (gallery.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 1200);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActiveIndex(0);
  };

  return (
    <Link to={`/carsDetails/${car?._id}`} className="block h-full group">
      <div
        onMouseEnter={startCycling}
        onMouseLeave={stopCycling}
        className="card bg-base-100 dark:bg-slate-900 border border-base-200 dark:border-slate-800 rounded-2xl overflow-hidden
                   transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl h-full flex flex-col justify-between"
      >
        {/* ইমেজ গ্যালারি ও ব্যাজ */}
        <figure className="relative aspect-[16/10] overflow-hidden bg-base-200 dark:bg-slate-800">
          {gallery.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={car?.carName}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:scale-105 transition-transform ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* ক্যাটাগরি ব্যাজ */}
          {car?.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-lg">
              {car.category}
            </span>
          )}

          {/* Availability ব্যাজ */}
          {car?.availability && (
            <span
              className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-lg text-white ${
                car.availability === 'Sold Out' ? 'bg-error' : 'bg-success'
              }`}
            >
              {car.availability}
            </span>
          )}

          {/* একাধিক ইমেজ থাকলে ইন্ডিকেটর ডট */}
          {gallery.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 backdrop-blur-xs px-2 py-1 rounded-full">
              {gallery.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </figure>

        {/* গাড়ির বিবরণ */}
        <div className="card-body p-5 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="card-title text-lg font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {car?.carName}
            </h2>

            <p className="text-primary font-black text-xl mt-1">
              ৳ {Number(car?.price || 0).toLocaleString()}
            </p>
          </div>

          <div>
            {/* কুইক স্পেসিফিকেশন রো */}
            <div className="grid grid-cols-3 gap-2 mt-3 border-t border-base-200 dark:border-slate-800 pt-3 text-center">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium">Year</span>
                <span className="font-semibold text-sm">
                  {car?.carInformation?.modelYear || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col border-x border-base-200 dark:border-slate-800">
                <span className="text-[11px] text-gray-400 font-medium">Power</span>
                <span className="font-semibold text-sm">
                  {car?.carInformation?.horsepower || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium">Top Speed</span>
                <span className="font-semibold text-sm">
                  {car?.carInformation?.topSpeed || 'N/A'}
                </span>
              </div>
            </div>

            {/* মাইলেজ এবং রেটিং */}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500 border-t border-base-200 dark:border-slate-800 pt-2">
              <span className="text-xs">{car?.mileage || '0 km'}</span>
              <span className="flex items-center gap-1 text-warning font-semibold text-xs">
                ★ {car?.rating || '5.0'}
                <span className="text-gray-400 font-normal">
                  ({car?.reviewsCount || 0})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// মেইন AllCars কম্পোনেন্ট
const AllCars = () => {
  const instanceSecure = useInstanceScure();

  //? TanStack Query
  const { data: allcars = [], isLoading, isError, error } = useQuery({
    queryKey: ['allCars'],
    queryFn: async () => {
      const res = await instanceSecure.get('/allCars');
      return res.data;
    },
  });

  //! লোডিং স্টেট (Skeleton কার্ডস)
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 w-48 bg-base-300 rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card bg-base-200 h-80 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  //! এরর স্টেট
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] px-4">
        <div className="alert alert-error max-w-md shadow-lg text-white">
          <span>Failed to load cars: {error?.message || 'Something went wrong!'}</span>
        </div>
      </div>
    );
  }

  //! খালি ডাটা স্টেট
  if (!allcars.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="p-4 bg-base-200 rounded-full mb-3">🚗</div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">No Cars Available</h3>
        <p className="text-gray-400 text-sm mt-1">There are currently no cars listed in the database.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* সেকশন হেডার */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              All Available Cars
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore our wide collection of premium vehicles ({allcars.length} available)
            </p>
          </div>
        </div>

        {/* রেসপনসিভ গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allcars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCars;