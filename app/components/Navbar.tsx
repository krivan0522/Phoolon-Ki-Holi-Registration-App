"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To get the current path
import { useAuth } from "@/providers/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const pathname = usePathname(); // Get the current path
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    interface LinkClassesProps {
        path: string;
    }

    const getLinkClasses = ({ path }: LinkClassesProps): string =>
        pathname === path
            ? "text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg px-4 py-2"
            : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-lg px-4 py-2";

    return (
        <nav className="border-b-4 border-pink-500 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/rkt-logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10"
                    />
                    <span className="text-white text-2xl font-bold tracking-wide">
                        Phoolon Ki Holi
                    </span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-controls="navbar-default"
                    aria-expanded={menuOpen}
                >
                    <span className="sr-only">Open main menu</span>
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

                {/* Navigation Links */}
                <div
                    className={`${
                        menuOpen ? "block" : "hidden"
                    } w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg  md:flex-row md:space-x-6 md:mt-0 md:bg-transparent">
                        <li className="my-2">
                            <Link href="/" className={getLinkClasses({ path: "/" })}>
                                Home
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/about" className={getLinkClasses({ path: "/about" })}>
                                About
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/registration"
                                className={getLinkClasses({ path: "/registration" })}
                            >
                                Register Idol
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/donation" className={getLinkClasses({ path: "/donation" })}>
                                Donate
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link href="/contact" className={getLinkClasses({ path: "/contact" })}>
                                Contact
                            </Link>
                        </li>
                        {!isLoggedIn ? (
                            <li className="my-2">
                                <Link href="/login" className={getLinkClasses({ path: "/login" })}>
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
                                    className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-lg px-4 py-2"
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
