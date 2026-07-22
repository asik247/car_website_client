import React, { useEffect, useState } from "react";
import { FaCarSide, FaMoon, FaSun } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router";

const Nav = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = (e) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navLinkClass = ({ isActive }) =>
        `relative px-1 py-2 font-medium transition-colors ${
            isActive
                ? "text-primary"
                : "text-base-content/70 hover:text-base-content"
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `block px-3 py-2 rounded-lg font-medium transition-colors ${
            isActive
                ? "bg-primary/10 text-primary"
                : "text-base-content/70 hover:bg-base-content/5 hover:text-base-content"
        }`;

    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/listing" className={navLinkClass}>
                    Inventory
                </NavLink>
            </li>

            <li>
                <details className="group">
                    <summary className="font-medium text-base-content/70 hover:text-base-content transition-colors cursor-pointer marker:content-none">
                        Pages
                    </summary>
                    <ul className="p-2 mt-2 bg-base-100 border border-base-content/10 rounded-box shadow-lg w-52 z-50">
                        <li>
                            <Link
                                to="/about"
                                className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dealers"
                                className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                Dealers
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/faq"
                                className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <NavLink to="/blog" className={navLinkClass}>
                    Blog
                </NavLink>
            </li>

            <li>
                <NavLink to="/contact" className={navLinkClass}>
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div
            className={`sticky top-0 z-50 bg-base-100/80 backdrop-blur-md transition-shadow duration-300 ${
                scrolled
                    ? "shadow-md border-b border-base-content/5"
                    : "border-b border-transparent"
            }`}
        >
            <div className="navbar max-w-7xl mx-auto px-6 lg:px-7 ">
                {/* Logo */}
                <div className="navbar-start">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg sm:text-2xl font-bold tracking-tight cursor-pointer"
                    >
                        <span className="grid place-items-center w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-primary/10 text-primary shrink-0">
                            <FaCarSide className="text-sm sm:text-lg" />
                        </span>
                        <span className="text-base-content whitespace-nowrap">
                            Asik <span className="text-primary">Wheels</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6">
                        {links}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="navbar-end gap-2">
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle btn-sm sm:btn-md cursor-pointer hover:bg-primary/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? (
                            <FaMoon className="text-base sm:text-lg text-base-content/70" />
                        ) : (
                            <FaSun className="text-base sm:text-lg text-yellow-400" />
                        )}
                    </button>

                    <Link
                        to="/login"
                        className="btn btn-primary btn-sm sm:btn-md shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        Login
                    </Link>

                    {/* Mobile hamburger / close toggle */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="btn btn-ghost btn-circle btn-sm sm:btn-md lg:hidden cursor-pointer"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <HiX className="h-6 w-6" />
                        ) : (
                            <HiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown panel */}
            <div
                className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t ${
                    menuOpen
                        ? "max-h-96 opacity-100 border-base-content/10"
                        : "max-h-0 opacity-0 border-transparent"
                }`}
            >
                <ul
                    className="menu menu-vertical p-3 gap-1 bg-base-100"
                    onClick={(e) => {
                        if (e.target.closest("a")) setMenuOpen(false);
                    }}
                >
                    <li>
                        <NavLink to="/" className={mobileNavLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/listing" className={mobileNavLinkClass}>
                            Inventory
                        </NavLink>
                    </li>
                    <li>
                        <details>
                            <summary className="font-medium text-base-content/70 cursor-pointer marker:content-none rounded-lg px-3">
                                Pages
                            </summary>
                            <ul className="p-2 ml-2">
                                <li>
                                    <Link
                                        to="/about"
                                        className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dealers"
                                        className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        Dealers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/faq"
                                        className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <NavLink to="/blog" className={mobileNavLinkClass}>
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={mobileNavLinkClass}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;