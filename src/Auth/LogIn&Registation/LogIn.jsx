import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-14">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
                .font-display { font-family: 'Fraunces', serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .font-mono { font-family: 'IBM Plex Mono', monospace; }
            `}</style>

            <div className="w-full max-w-sm  rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 p-8 sm:p-10">
                {/* Brand mark */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-7 h-7 rounded-full bg-teal-600" />
                    <span className="font-mono text-xs tracking-widest uppercase text-slate-500">
                        Basecamp Studio
                    </span>
                </div>

                <div className="text-center">
                    <h1 className="font-display text-3xl font-medium ">
                        Welcome back
                    </h1>
                    <p className="font-body text-sm mt-2">
                        New here?{' '}
                        <a href="#" className="text-teal-700 font-medium hover:text-teal-800">
                            Create an account
                        </a>
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="font-body text-sm font-medium  block mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="font-body text-sm font-medium ">
                                Password
                            </label>
                            <a href="#" className="font-body text-xs  hover:text-primary">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <FaLock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="font-body w-full rounded-lg  bg-primary text-sm font-medium py-2.5 mt-2 shadow-sm shadow-teal-900/10 transition-colors"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;