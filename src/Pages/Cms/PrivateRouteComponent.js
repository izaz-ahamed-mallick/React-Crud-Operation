import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRouteComponent = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="w-full h-screen">
            {isAuthenticated ? children : <Navigate to="/" />}
        </div>
    );
};

export default PrivateRouteComponent;
