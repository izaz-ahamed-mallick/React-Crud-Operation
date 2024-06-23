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
        <div className="w-full h-20 shadow-lg bg-red-100 flex items-center justify-between px-6">
            <div className="footer-logo flex items-center">
                <h1 className="text-4xl font-semibold">
                    <span className="text-orange-600">X</span>
                    <span className="text-white">Y</span>
                    <span className="text-green-700">Z</span>
                </h1>
            </div>
            <div className="social-icons flex items-center">
                <Link to="https://www.facebook.com" className="text-xl mx-2">
                    <FaFacebookF />
                </Link>
                <Link to="https://www.twitter.com" className="text-xl mx-2">
                    <FaTwitter />
                </Link>
                <Link to="https://www.instagram.com" className="text-xl mx-2">
                    <FaInstagram />
                </Link>
                <Link to="https://www.linkedin.com" className="text-xl mx-2">
                    <FaLinkedinIn />
                </Link>
            </div>
        </div>
    );
};

export default Footer;
