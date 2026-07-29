import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import { FaCircleExclamation } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Registration = () => {
    const { registerUser, verifyEmail, updateUserInfo } = use(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const location = useLocation();
    const navegate = useNavigate();
    // console.log(location);
    // Todo state here;
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });

    // ✅ new state: preview URL for the selected profile image
    const [imagePreview, setImagePreview] = useState(null);

    // Todo react hook from using get input field data and validation.
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    // ✅ react-hook-form's register() returns { onChange, onBlur, name, ref }
    // we destructure it so we can hook our own onChange (for the live preview)
    // in ADDITION to react-hook-form's onChange, without losing form registration.
    const { onChange: rhfImageOnChange, ...imageRegisterRest } = register("image");

    const handleImageChange = (e) => {
        rhfImageOnChange(e); // keep react-hook-form in sync
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        } else {
            setImagePreview(null);
        }
    };

    const handlerRegister = (data) => {
        // Todo get user img in input field.
        const userImage = data.image[0]
        // console.log(userImage);
        registerUser(data.email, data.password)
            .then(() => {
                // console.log(res.user);
                navegate(location.state || '/')
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
                //? image get.
                const formData = new FormData();
                formData.append('image', userImage)
                //? apis here.
                const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

                axios.post(imageUrl, formData)
                    .then(res => {
                        // console.log(res.data.data.url);
                        // ? update displayName + photourl.
                        const updateInfo = {
                            displayName: data.name,
                            photoURL: res.data.data.url

                        }
                        updateUserInfo(updateInfo)
                            .then(() => {
                                // console.log('update successfully');
                            })
                        // console.log(updateInfo);
                        //! Implement userinfo post in db, users coll.
                    })
                    .catch(err => {
                        console.log(err);
                    });


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
                {/* Brand markss */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-7 h-7 rounded-full bg-primary" />
                    <span className="font-mono text-xs tracking-widest uppercase">
                        Basecamp Studio
                    </span>
                </div>

                <div className="text-center">
                    <h2 className="font-display text-3xl font-medium">
                        Create your account
                    </h2>
                    <p className="font-body text-sm mt-2 opacity-70">
                        Already have one?{' '}
                        <Link state={location.state} to={'/auth'} className="text-primary font-bold hover:text-blue-800">
                            Log in instead
                        </Link>
                    </p>
                </div>

                <form
                    className="mt-8 space-y-5 w-full"
                    onSubmit={handleSubmit(handlerRegister)}
                >

                    {/* ✅ Avatar Upload with live preview */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="w-8 h-8 text-slate-300" />
                                )}
                            </div>

                            <label
                                htmlFor="photo"
                                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center cursor-pointer shadow-md hover:opacity-90 transition-all"
                                title="Upload profile photo"
                            >
                                <FaCamera className="w-3.5 h-3.5" />
                            </label>

                            <input
                                {...imageRegisterRest}
                                onChange={handleImageChange}
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs opacity-60 font-body">
                            {imagePreview ? 'Looking good — tap the camera to change it' : 'Add a profile photo (optional)'}
                        </p>
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
                        className="w-full rounded-lg bg-primary text-primary-content py-3 font-medium hover:opacity-90 transition-all shadow-sm"
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