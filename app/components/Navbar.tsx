"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth token and update state
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        router.push("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-white shadow">
            {/* Logo Section */}
            <div className="container mx-auto px-4 flex items-center h-16 justify-center w-full">
                <Image
                    src="/rkt-logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="relative top-8"
                />
            </div>
            
            {/* Navigation Links */}
            <div className="bg-red-800 h-10 px-4 mx-auto flex align-middle justify-center">
                <ul className="flex justify-start md:justify-evenly w-full text-white items-center">
                    <li className="flex align-middle justify-center px-4">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="flex align-middle justify-center px-4">
                        <Link href="/about">About</Link>
                    </li>
                    {isLoggedIn && (
                        <li className="flex align-middle justify-center px-4">
                            <Link href="/registration">Register Idol</Link>
                        </li>
                    )}
                </ul>
                
                <ul className="flex justify-end md:justify-evenly w-full text-white items-center">
                    <li className="flex align-middle justify-center px-4">
                        <Link href="/contact">Contact Us</Link>
                    </li>
                    <li className="flex align-middle justify-center px-4">
                        <Link href="/donation">Donate</Link>
                    </li>
                    {!isLoggedIn ? (
                        <li className="flex align-middle justify-center px-4">
                            <Link href="/login">Login</Link>
                        </li>
                    ) : (
                        <li className="flex align-middle justify-center px-4">
                            <button
                                onClick={handleLogout}
                                className="text-white hover:underline"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
