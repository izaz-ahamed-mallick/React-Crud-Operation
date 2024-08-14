import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("image");
        localStorage.removeItem("name");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
