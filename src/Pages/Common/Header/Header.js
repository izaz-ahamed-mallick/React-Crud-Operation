import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-toastify";
import { profile_pic } from "../../../Utils/Helper";

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.error("Logout Successful");
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            const storedName = localStorage.getItem("name");
            const storedImage = localStorage.getItem("image");

            if (storedName) {
                setUserName(storedName);
            }

            if (storedImage) {
                setUserImage(storedImage);
            }
        }
    }, [isAuthenticated]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
    };

    return (
        <header className="w-full h-16 px-6 bg-gradient-to-r from-transparent via-white to-transparent bg-opacity-30 backdrop-blur-lg text-white shadow-xl fixed top-0 z-50 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <Link
                    to="/"
                    className="text-3xl font-extrabold flex items-center space-x-1 tracking-wide"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-300 to-purple-500">
                        SHOPY
                    </span>
                </Link>
            </div>
            {isAuthenticated && (
                <div className="relative flex items-center">
                    <span className="text-lg font-medium mr-4 text-black">
                        Hello,{" "}
                        <span className="font-semibold ">{userName}</span>
                    </span>
                    <div
                        onClick={toggleDropdown}
                        className="relative cursor-pointer"
                    >
                        <img
                            src={profile_pic(userImage)}
                            alt="User"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-transform transform hover:scale-110"
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-20 border border-gray-300">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/createproduct"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={handleLinkClick}
                                >
                                    Create Product
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
