import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useInstanceScure from '../../Hooks/useInstanceScure';

// --- সিঙ্গেল কার কার্ড কম্পোনেন্ট (হোভার ইমেজ সাইক্লিং সহ) ---
const CarCard = ({ car }) => {
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
    }, 1100);
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
        className="card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between h-full"
      >
        {/* গ্যালারি এবং স্ট্যাটাস ব্যাজ */}
        <figure className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          {gallery.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={car?.carName || 'Vehicle'}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
                idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          ))}

          {/* গ্রেডিয়েন্ট ওভারলে */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* ক্যাটাগরি ব্যাজ */}
          {car?.category && (
            <span className="absolute top-3.5 left-3.5 px-3 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-full shadow-sm">
              {car.category}
            </span>
          )}

          {/* Availability ব্যাজ */}
          {car?.availability && (
            <span
              className={`absolute top-3.5 right-3.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-white ${
                car.availability.toLowerCase() === 'sold out'
                  ? 'bg-rose-500'
                  : 'bg-emerald-500'
              }`}
            >
              {car.availability}
            </span>
          )}

          {/* স্লাইডার ইন্ডিকেটর ডটস */}
          {gallery.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
              {gallery.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </figure>

        {/* কার্ডের কনটেন্ট */}
        <div className="p-5 flex flex-col justify-between flex-grow gap-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-primary transition-colors">
                {car?.carName}
              </h3>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-md">
                <span>★</span>
                <span>{car?.rating || '5.0'}</span>
                <span className="text-slate-400 font-normal">
                  ({car?.reviewsCount || 0})
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                ৳ {Number(car?.price || 0).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ negotiable</span>
            </div>
          </div>

          <div>
            {/* স্পেক্স গ্রিড */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Year</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {car?.carInformation?.modelYear || '2023'}
                </p>
              </div>
              <div className="border-x border-slate-200 dark:border-slate-700/80">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Power</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {car?.carInformation?.horsepower || '180 HP'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Speed</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {car?.carInformation?.topSpeed || '210 km/h'}
                </p>
              </div>
            </div>

            {/* কার্ড ফুটার ও বাটন */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {car?.mileage || '12,000 km'}
              </span>

              <span className="inline-flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                Details 
                <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- মেইন AllCars পেজ কম্পোনেন্ট ---
const AllCars = () => {
  const instanceSecure = useInstanceScure();

  // সার্চ এবং ফিল্টারিং স্টেট
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // TanStack Query দিয়ে ডাটা ফেচ
  const { data: allcars = [], isLoading, isError, error } = useQuery({
    queryKey: ['allCars'],
    queryFn: async () => {
      const res = await instanceSecure.get('/allCars');
      return res.data;
    },
  });

  // ডাইনামিক ক্যাটাগরি লিস্ট
  const categories = useMemo(() => {
    const list = new Set(allcars.map((car) => car.category).filter(Boolean));
    return ['All', ...Array.from(list)];
  }, [allcars]);

  // সার্চ ও ফিল্টার ক্যালকুলেশন
  const filteredCars = useMemo(() => {
    return allcars
      .filter((car) => {
        const matchesName = car.carName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
        return matchesName && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [allcars, searchTerm, selectedCategory, sortBy]);

  // রিসেট ফিল্টার
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen   py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* হেডার ও ইন্ট্রো সেকশন */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary-content border border-primary/30">
              Verified Marketplace
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Discover Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                Dream Drive.
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore authentic, high-performance, and luxury vehicles inspected by automotive specialists. Transparent pricing with instant booking support.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-6">
            <svg width="400" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
            </svg>
          </div>
        </div>

        {/* ফিল্টারিং এবং সার্চ বার */}
        <div className="bg-white  dark:bg-slate-900 p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* সার্চ ইনপুট */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by vehicle name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* ড্রপডাউন ও সর্টিং */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto ">
            {/* ক্যাটাগরি */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered select-sm h-10 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex-1 sm:flex-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* সর্ট */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered select-sm h-10 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex-1 md:hidden sm:flex-none"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* রেজাল্ট স্টেটাস লাইন */}
        <div className="flex items-center justify-between text-sm text-slate-500 px-1">
          <p>
            Showing <span className="font-bold text-slate-800 dark:text-slate-100">{filteredCars.length}</span> of {allcars.length} cars
          </p>
          {(searchTerm || selectedCategory !== 'All' || sortBy !== 'default') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* লোডিং স্কেলিটন */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* এরর মেসেজ */}
        {isError && (
          <div className="p-8 text-center bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-3xl">
            <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400">Failed to load cars</h3>
            <p className="text-sm text-slate-500 mt-1">{error?.message || 'Database connection error. Please try again later.'}</p>
          </div>
        )}

        {/* কোনো ডাটা না পেলে এম্পটি স্টেট */}
        {!isLoading && !isError && filteredCars.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Match Found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
              We couldn't find any cars matching your criteria. Try adjusting your search query or reset the filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* মেইন কার গ্রিড */}
        {!isLoading && !isError && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllCars;