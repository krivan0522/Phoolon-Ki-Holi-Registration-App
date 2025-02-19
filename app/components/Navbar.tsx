"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const pathname = usePathname();
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        window.location.reload();
    };
    useEffect(() => {
        setIsLogin(pathname === "/login");
    }, [pathname]);
    const getLinkClasses = (path: string): string =>
        pathname === path
            ? "text-[#000000b3] bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg px-4 py-2"
            : "text-gray-200 hover:text-[#000000b3] hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-lg px-4 py-2 transition-all duration-300";

    return (
        <nav className="border-b-4 border-pink-500 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/rkt-logo.webp"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-white text-2xl font-extrabold">
                        Phoolon Ki Holi
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg lg:hidden hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-controls="navbar-default"
                    aria-expanded={menuOpen}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation Links */}
                <div className={`w-full lg:flex lg:items-center lg:w-auto ${menuOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col items-center font-medium mt-4 lg:flex-row lg:space-x-5 lg:mt-0" onClick={() => setMenuOpen(!menuOpen)}>
                        <li className="my-2">
                            <Link href="/" className={getLinkClasses("/")} >
                                Home
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/gallery" className={getLinkClasses("/gallery")}>
                                Gallery
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/registration" className={getLinkClasses("/registration")}>
                                Register Idol
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/donation" className={getLinkClasses("/donation")}>
                                Contribute
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/contact" className={getLinkClasses("/contact")}>
                                Contact
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/suggestions" className={getLinkClasses("/suggestions")}>
                                Suggestions
                            </Link>
                        </li>
                        {isLogin ? (
                            <li className="my-2">
                                <Link href="/signup" className={getLinkClasses("/signup")}>
                                    Signup
                                </Link>
                            </li>
                        ) :
                        !isLoggedIn ? (
                            <li className="my-2">
                                <Link href="/login" className={getLinkClasses("/login")}>
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <li className="my-2">
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-lg px-4 py-2 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
