import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Purely visual: shows a live preview of the chosen photo.
    // Wire up real upload/validation/submit logic yourself.
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setAvatarPreview(URL.createObjectURL(file));
    };
    //Todo react hook from using get input field data and validation.
    const { register, handleSubmit } = useForm();
    const handlerRegister = (e) => {

        console.log(e.name, e.email, e.image,e.password,e.confarmPassword);

    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-14 ">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
                .font-display { font-family: 'Fraunces', serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .font-mono { font-family: 'IBM Plex Mono', monospace; }
            `}</style>

            <div className="w-full max-w-lg  rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 p-8 sm:p-10">
                {/* Brand mark */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-7 h-7 rounded-full bg-teal-600" />
                    <span className="font-mono text-xs tracking-widest uppercase">
                        Basecamp Studio
                    </span>
                </div>

                <div className="text-center">
                    <h2 className="font-display text-3xl font-medium ">
                        Create your account
                    </h2>
                    <p className="font-body text-sm  mt-2">
                        Already have one?{' '}
                        <a href="#" className="text-teal-700 font-medium hover:text-teal-800">
                            Log in instead
                        </a>
                    </p>
                </div>

                <form className="mt-8 space-y-5 w-full " onSubmit={handleSubmit(handlerRegister)}>
                    {/* Avatar upload */}
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                            <div className="w-16 h-16 rounded-full  border border-slate-200 flex items-center justify-center overflow-hidden">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                ) : (
                                    <FaUser className="w-6 h-6" />
                                )}
                            </div>
                            <label
                                htmlFor="photo"
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center cursor-pointer border-2 border-white hover:bg-teal-800 transition-colors"
                            >
                                <FaCamera className="w-3 h-3 " />
                            </label>
                            <input {...register('image')} id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </div>
                        <div>
                            <p className="font-body text-sm font-medium ">Profile photo</p>
                            <p className="font-mono text-[11px]  mt-0.5">PNG or JPG, up to 5MB</p>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="font-body text-sm font-medium block mb-1.5">
                            Full name
                        </label>
                        <div className="relative">
                            <FaUser className="w-4 h-4  absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('name')}
                                id="name"
                                type="text"
                                placeholder="Jamie Rivera"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="font-body text-sm font-medium  block mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="w-4 h-4  absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('email')}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="font-body text-sm font-medium  block mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="w-4 h-4  absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('password')}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="At least 8 characters"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-10 py-2.5 text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label htmlFor="confirm" className="font-body text-sm font-medium  block mb-1.5">
                            Confirm password
                        </label>
                        <div className="relative">
                            <FaLock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('confarmPassword')}
                                id="confirm"
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Re-enter your password"
                                className="font-body w-full rounded-lg border border-slate-200 pl-10 pr-10 py-2.5 text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="font-body w-full rounded-lg bg-teal-700 hover:bg-teal-800  text-sm font-medium py-2.5 mt-2 shadow-sm shadow-teal-900/10 transition-colors"
                    >
                        Create account
                    </button>

                    <p className="font-body text-[13px] text-slate-400 text-center pt-1">
                        By continuing you agree to our{' '}
                        <a href="#" className="underline hover:text-slate-600">Terms</a> and{' '}
                        <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;