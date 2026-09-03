import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaCircleExclamation } from 'react-icons/fa6';
import Swal from 'sweetalert2';
const LogIn = () => {
    const { logInUser, socaialLogin, user, forgotPassword, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('')
    const location = useLocation();
    const navegate = useNavigate();

    //Todo handler LogIn user.
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm()
    const handlerLogIn = (data) => {
        // console.log('name', data.email);
        setSuccess('')
        logInUser(data.email, data.password)
            .then(() => {
                // console.log(res.user);
                navegate(location.state || '/')
                setSuccess('Login done')


            }).catch(() => {
                setError('root', {
                    type: 'maniul',
                    message: 'LogIn failed'
                })
            })
    }
    //Todo handler password update.
    const userEmail = watch('email');
    const handlerPasswordUpdate = (e) => {
        e.preventDefault()
        if (!userEmail) {
            Swal.fire({
                icon: "error",
                title: "Please enter your email first!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        forgotPassword(userEmail)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Checked Your email and update password!",
                    timer: 1500
                });
            }).catch(err => {
                console.log(err.message);
            })
    }

    if (loading) {
        return <p>Loading...</p>
    }
    //? Handler socail login code here.
    const handlerSocailLogin = () => {
        console.log('socail login btn clicked');
    }
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
                    <div className="w-7 h-7 rounded-full bg-primary" />
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
                        <Link state={location.state} to={'/auth/registation'} className="text-primary font-medium hover:text-teal-800">
                            Create an account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(handlerLogIn)}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="font-body text-sm font-medium  block mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('email', { required: 'Email is required' })}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email
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
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="font-body text-sm font-medium ">
                                Password
                            </label>
                            {/* funk implement */}
                            < button onClick={handlerPasswordUpdate} className="font-body text-xs cursor-pointer hover:text-primary">
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <FaLock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                {...register('password', {
                                    required: 'Password is required', minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    }, pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                        message:
                                            "Must contain uppercase, lowercase and a number",
                                    },
                                })}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.password
                                    ? "border-error focus:ring-error/30"
                                    : "border-base-300 focus:ring-primary/30 focus:border-primary"
                                    }`}
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

                        {/* show error when not filup password field */}
                        {errors.password && (
                            <p className="flex items-center gap-1 text-error text-sm mt-2">
                                <FaCircleExclamation />
                                {errors.password.message}
                            </p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="font-body w-full rounded-lg  bg-primary text-sm font-medium py-2.5 mt-2 shadow-sm shadow-teal-900/10 transition-colors"
                    >
                        Log in
                    </button>

                    {/* error message show */}
                    <div className='text-sm md:text-2xl font-bold text-center'>
                        {
                            errors.root && <p className='text-red-500 text-xl'>{errors.root.message}</p>
                        }
                    </div>
                    <div className='text-sm md:text-2xl font-bold text-center'>
                        {
                            success && <p className='text-green-500 text-xl'>{success}</p>
                        }
                    </div>
                </form>
                {/* socail login */}
                <h1 className='text-center font-bold my-2'>OR</h1>
                <button onClick={handlerSocailLogin} className="btn w-full bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default LogIn;