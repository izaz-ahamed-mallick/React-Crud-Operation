import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="footer-logo mb-6 md:mb-0 flex items-center space-x-2">
                    <Link
                        to="/"
                        className="text-4xl font-extrabold flex items-center"
                    >
                        <span className="text-blue-400">S</span>
                        <span className="text-pink-400">H</span>
                        <span className="text-yellow-400">O</span>
                        <span className="text-green-400">P</span>
                        <span className="text-red-400">Y</span>
                    </Link>
                </div>
                <div className="social-icons flex space-x-6 mb-6 md:mb-0">
                    <Link
                        to="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-blue-500 transition-colors duration-300"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        to="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-blue-400 transition-colors duration-300"
                    >
                        <FaTwitter />
                    </Link>
                    <Link
                        to="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-pink-500 transition-colors duration-300"
                    >
                        <FaInstagram />
                    </Link>
                    <Link
                        to="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-blue-700 transition-colors duration-300"
                    >
                        <FaLinkedinIn />
                    </Link>
                </div>
                <div className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="font-semibold">SHOPY</span>. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
