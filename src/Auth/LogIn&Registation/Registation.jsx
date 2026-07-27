import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import { FaCircleExclamation } from "react-icons/fa6";
import { Link } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Registration = () => {
    const { registerUser, verifyEmail } = use(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    //Todo  state here;
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });


    // Purely visual: shows a live preview of the chosen photo.
    // Wire up real upload/validation/submit logic yourself.
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setAvatarPreview(URL.createObjectURL(file));
    };
    //Todo react hook from using get input field data and validation.
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const handlerRegister = (data) => {
        // console.log(e.name, e.email, e.image,e.password,e.confarmPassword);

        registerUser(data.email, data.password)
            .then(() => {
                verifyEmail()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "please verify your email",
                    showConfirmButton: false,
                    timer: 1500
                });
                //Todo email verification ?
                setMessage({
                    type: 'success',
                    text: 'Register Done'
                })

            }).catch(() => {
                setMessage({
                    type: 'error',
                    text: 'Register failed'
                })

            })

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
                    <div className="w-7 h-7 rounded-full bg-primary" />
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
                        <Link to={'/auth'} className="text-primary font-medium hover:text-teal-800">
                            Log in instead
                        </Link>
                    </p>
                </div>

                <form
                    className="mt-8 space-y-5 w-full"
                    onSubmit={handleSubmit(handlerRegister)}
                >
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                            <div className="w-16 h-16 rounded-full border border-base-300 flex items-center justify-center overflow-hidden">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="w-6 h-6 text-primary" />
                                )}
                            </div>

                            <label
                                htmlFor="photo"
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-content flex items-center justify-center cursor-pointer"
                            >
                                <FaCamera className="w-3 h-3" />
                            </label>

                            <input
                                {...register("image")}
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium">Profile photo</p>
                            <p className="text-xs opacity-70">PNG or JPG, up to 5MB</p>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            Full Name
                        </label>

                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

                            <input
                                {...register("name", {
                                    required: "Full name is required",
                                })}
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className={`w-full rounded-lg border pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name
                                    ? "border-error focus:ring-error/30"
                                    : "border-base-300 focus:ring-primary/30 focus:border-primary"
                                    }`}
                            />
                        </div>

                        {errors.name && (
                            <p className="flex items-center gap-1 text-error text-sm mt-2">
                                <FaCircleExclamation />
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full rounded-lg border pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email
                                    ? "border-error focus:ring-error/30"
                                    : "border-base-300 focus:ring-primary/30 focus:border-primary"
                                    }`}
                            />
                        </div>

                        {errors.email && (
                            <p className="flex items-center gap-1 text-error text-sm mt-2">
                                <FaCircleExclamation />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium block mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                        message:
                                            "Must contain uppercase, lowercase and a number",
                                    },
                                })}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="At least 6 characters"
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.password
                                    ? "border-error focus:ring-error/30"
                                    : "border-base-300 focus:ring-primary/30 focus:border-primary"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="flex items-center gap-1 text-error text-sm mt-2">
                                <FaCircleExclamation />
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium block mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                id="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter your password"
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                                    ? "border-error focus:ring-error/30"
                                    : "border-base-300 focus:ring-primary/30 focus:border-primary"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="flex items-center gap-1 text-error text-sm mt-2">
                                <FaCircleExclamation />
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary text-primary-content py-3 font-medium hover:opacity-90 transition-all"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm opacity-70">
                        By continuing you agree to our{" "}
                        <a href="#" className="text-primary underline">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                    <div className='mt-4 text-center text-sm md:text-2xl font-bold'>
                        {
                            message.text && (
                                <p className={`${message.type == 'success' ? 'text-green-500' : 'text-red-500'}`}>{message.text}</p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;