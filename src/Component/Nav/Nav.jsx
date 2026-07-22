import React, { useEffect, useState } from "react";
import { FaCarSide, FaMoon, FaSun } from "react-icons/fa";
import { HiMenu, HiX, HiOutlineHome, HiOutlineTruck, HiOutlineDocumentText, HiOutlineNewspaper, HiOutlineMail, HiChevronDown } from "react-icons/hi";
import { Link, NavLink } from "react-router";

const NAV_HEIGHT = "h-16 sm:h-[68px]";

const mobileLinks = [
    { to: "/", label: "Home", icon: HiOutlineHome },
    { to: "/listing", label: "Inventory", icon: HiOutlineTruck },
    { to: "/blog", label: "Blog", icon: HiOutlineNewspaper },
    { to: "/contact", label: "Contact", icon: HiOutlineMail },
];

const pagesLinks = [
    { to: "/about", label: "About Us" },
    { to: "/dealers", label: "Dealers" },
    { to: "/faq", label: "FAQ" },
];

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
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = (e) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    // lock page scroll while the mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const navLinkClass = ({ isActive }) =>
        `relative px-1 py-2 font-medium transition-colors ${isActive
            ? "text-primary"
            : "text-base-content/70 hover:text-base-content"
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive
            ? "bg-primary/10 text-primary"
            : "text-base-content hover:bg-base-content/5"
        }`;

    return (
        <>
            {/*
                Using `fixed` instead of `sticky` on purpose: `sticky` silently
                breaks (the bar scrolls away) if ANY parent element up the tree
                has `overflow: hidden/auto/scroll` set — very easy to hit by
                accident (e.g. a wrapper div with `overflow-x-hidden` to kill
                horizontal scroll). `fixed` positions relative to the viewport
                and ignores parent overflow, so it always stays put.
                The spacer div right below reserves the same height so page
                content doesn't jump underneath it.
            */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 w-full bg-base-100/80 backdrop-blur-md transition-shadow duration-300 ${scrolled
                        ? "shadow-md border-b border-base-content/5"
                        : "border-b border-transparent"
                    }`}
            >
                <div className={`navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 ${NAV_HEIGHT}`}>
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
                            <li>
                                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/listing" className={navLinkClass}>Inventory</NavLink>
                            </li>
                            <li>
                                <details className="group">
                                    <summary className="font-medium text-base-content/70 hover:text-base-content transition-colors cursor-pointer marker:content-none [&::-webkit-details-marker]:hidden">
                                        Pages
                                    </summary>
                                    <ul className="p-2 mt-2 bg-base-100 border border-base-content/10 rounded-box shadow-lg w-52 z-50">
                                        {pagesLinks.map((p) => (
                                            <li key={p.to}>
                                                <Link
                                                    to={p.to}
                                                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                                                >
                                                    {p.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
                            </li>
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

                        {/* Mobile hamburger toggle — bordered so it reads clearly as a button on any background */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="btn btn-ghost btn-circle btn-sm sm:btn-md border border-base-content/15 lg:hidden cursor-pointer"
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            aria-controls="mobile-drawer"
                        >
                            <HiMenu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Spacer so page content isn't hidden under the fixed bar */}
            <div className={NAV_HEIGHT} />

            {/* Backdrop overlay */}
            <div
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out lg:hidden ${menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Right-side slide-in drawer — shows every link, always, not just Login */}
            <aside
                id="mobile-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
                className={`fixed top-0 right-0 z-[100] h-full w-[82vw] max-w-xs bg-base-100 shadow-2xl border-l border-base-content/10 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer header */}
                <div className={`flex items-center justify-between px-4 border-b border-base-content/10 shrink-0 ${NAV_HEIGHT}`}>
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 text-lg font-bold tracking-tight"
                    >
                        <span className="grid place-items-center w-7 h-7 rounded-xl bg-primary/10 text-primary shrink-0">
                            <FaCarSide className="text-sm" />
                        </span>
                        <span className="text-base-content whitespace-nowrap">
                            Asik <span className="text-primary">Wheels</span>
                        </span>
                    </Link>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="btn btn-ghost btn-circle btn-sm border border-base-content/15 cursor-pointer"
                        aria-label="Close menu"
                    >
                        <HiX className="h-6 w-6" />
                    </button>
                </div>

                {/* Drawer links — every nav item, clearly visible with icons */}
                <ul
                    className="menu menu-vertical p-3 gap-1 flex-1 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target.closest("a")) setMenuOpen(false);
                    }}
                >
                    {mobileLinks.slice(0, 2).map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <NavLink to={to} className={mobileNavLinkClass}>
                                <Icon className="h-5 w-5 shrink-0 text-base-content/60" />
                                {label}
                            </NavLink>
                        </li>
                    ))}

                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-base-content cursor-pointer marker:content-none [&::-webkit-details-marker]:hidden hover:bg-base-content/5">
                                <HiOutlineDocumentText className="h-5 w-5 shrink-0 text-base-content/60" />
                                <span className="flex-1">Pages</span>
                                <HiChevronDown className="h-4 w-4 text-base-content/40 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <ul className="pl-11 pr-2 pb-1 pt-1 space-y-1">
                                {pagesLinks.map((p) => (
                                    <li key={p.to}>
                                        <Link
                                            to={p.to}
                                            className="block px-3 py-2 rounded-lg text-base-content/70 hover:bg-primary/10 hover:text-primary transition-colors"
                                        >
                                            {p.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>

                    {mobileLinks.slice(2).map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <NavLink to={to} className={mobileNavLinkClass}>
                                <Icon className="h-5 w-5 shrink-0 text-base-content/60" />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Drawer footer CTA */}
                <div className="p-4 border-t border-base-content/10 shrink-0 space-y-2">
                    <button
                        onClick={() => {
                            toggleTheme();
                        }}
                        className="btn btn-outline btn-block border-base-content/20"
                    >
                        {theme === "light" ? (
                            <>
                                <FaMoon className="text-base" /> Dark mode
                            </>
                        ) : (
                            <>
                                <FaSun className="text-base text-yellow-400" /> Light mode
                            </>
                        )}
                    </button>
                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="btn btn-primary btn-block shadow-lg shadow-primary/20"
                    >
                        Login
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Nav;