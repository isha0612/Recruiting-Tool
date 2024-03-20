import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { useDarkMode } from '../Context/darkModeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar({ page }) {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useUser();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleLogout() {
        toast("User Logged Out successfully", {
            type: "success", autoClose: 1000, onClose: () => {
                localStorage.removeItem("jwtoken");
                setIsAuthenticated(false);
                navigate("/");
            }
        });
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2 dark:text-gray-900" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                    <span className="font-semibold text-xl tracking-tight dark:text-gray-900">Recruiting Tool</span>
                </div>
                {page === "auth" && <DarkModeSwitch className="mr-0 sm:inline-block sm:mr-4" id="theme-switch" onChange={toggleDarkMode} checked={isDarkMode === 'false' ? true : false} size={30} />}
                {page !== "auth" &&
                    <>
                        <div className="inline-block mt-2 lg:hidden sm:mb-0">
                            <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white dark:text-gray-900 dark:border-gray-900 dark:hover:text-gray-900" onClick={toggleMenu}>
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>
                        <div className={`w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <DarkModeSwitch className="sm:inline-block md:inline-block block mr-4 md:mb-4 sm:inline-block mt-2" id="theme-switch" onChange={toggleDarkMode} checked={isDarkMode === 'false' ? true : false} size={30} />
                            {page === "candidate" && <Link to="/home" className="sm:inline-block md:inline-block text-sm px-2 py-1.5 mr-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 dark:text-gray-900 dark:border-gray-900 dark:hover:text-white dark:hover:bg-gray-700 sm:text-base sm:px-4 py-2">
                                Home
                            </Link>}
                            {page === "" && <Link to="/add_candidate" className="sm:inline-block md:inline-block text-sm px-2 py-1 mr-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 dark:text-gray-900 dark:border-gray-900 dark:hover:text-white dark:hover:bg-gray-700 sm:text-base sm:px-4 py-2">Add a Candidate</Link>}
                            {page !== "auth" && <div onClick={handleLogout} className="hover:cursor-pointer inline-block md:inline-block text-sm px-2 py-2 mr-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 dark:text-gray-900 dark:border-gray-900 dark:hover:text-white dark:hover:bg-gray-700 sm:text-base">Log Out</div>}
                        </div>
                    </>
                }
            </nav>
            <hr />
            <ToastContainer />
        </>
    )
}