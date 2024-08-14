import React from "react";

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRouteComponent = ({ children }) => {
    const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

    return (
        <div className="h-screen">
            {token !== null && token !== undefined ? (
                children
            ) : (
                <>
                    <Navigate to="/" />
                    {toast(
                        "Please go for login either you can't access product list"
                    )}
                </>
            )}
            ;
        </div>
    );
};

export default PrivateRouteComponent;
