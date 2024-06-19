import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-toastify";

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        toast.error("Logout Succefully done");
        logout();
    };
    return (
        <div className="w-full h-[80px] shadow-lg -300 px-6 bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="h-full flex  items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold">
                        <span className="text-orange-600">X</span>
                        <span className="text-white">Y</span>
                        <span className="text-green-700">Z</span>
                    </h1>
                </div>
                {isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
                        >
                            <Link to={"/"}>Logout</Link>
                        </button>

                        <div>
                            <button className="bg-green-700 text-white py-2 px-4 rounded-md font-semibold">
                                <Link to={"/createproduct"}>
                                    Create Product
                                </Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
