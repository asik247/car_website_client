import React from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router";
// import { FaCarSide } from "react-icons/fa";

const Nav = () => {
    const links = (
        <>
            <li>
                <details>
                    <summary>Home</summary>
                    <ul className="p-2 bg-base-100 rounded-box w-52 z-50">
                        <li>
                            <Link to="/">Home 1</Link>
                        </li>
                        <li>
                            <Link to="/home-2">Home 2</Link>
                        </li>
                        <li>
                            <Link to="/home-3">Home 3</Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <Link to="/listing">Inventory</Link>
            </li>

            <li>
                <details>
                    <summary>Pages</summary>
                    <ul className="p-2 bg-base-100 rounded-box w-52 z-50">
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/dealers">Dealers</Link>
                        </li>
                        <li>
                            <Link to="/faq">FAQ</Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <Link to="/blog">Blog</Link>
            </li>

            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Mobile Menu + Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-60"
                        >
                            {links}
                        </ul>
                    </div>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold"
                    >
                        <FaCarSide className="text-primary text-3xl" />
                        <span>Asik Wheels</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="navbar-end gap-2">
                    <Link
                        to="/login"
                        className="btn btn-ghost hidden sm:flex"
                    >
                        Login
                    </Link>

                    <Link
                        to="/add-car"
                        className="btn btn-primary"
                    >
                        Add Listing
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;