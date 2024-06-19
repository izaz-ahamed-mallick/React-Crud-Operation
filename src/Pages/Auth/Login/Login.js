import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../Utils/Helper";
import { AuthContext } from "../../../Context/AuthProvider";
import validation from "../../../Utils/Validation";

const Login = () => {
    const timeoutRef = useRef(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const validation = () => {
        let error = {};

        if (!users.email) {
            error.email = "Email is required";
        }
        if (!users.password) {
            error.password = "Password is required";
        }
        setError(error);

        return Object.keys(error).length === 0; // Returns true if there are no errors
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setUsers((prevState) => ({ ...prevState, [name]: value }));
        if (name === "email" && value.length === 0) {
            setError((prevState) => ({
                ...prevState,
                email: "Email is required",
            }));
        } else if (name === "email") {
            setError((prevState) => ({ ...prevState, email: "" }));
        }

        if (name === "password" && value.length === 0) {
            setError((prevState) => ({
                ...prevState,
                password: "Password is required",
            }));
        } else if (name === "password") {
            setError((prevState) => ({ ...prevState, password: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validation()) {
            setLoading(true);
            // Perform login logic here if validation passes
            const formdata = new FormData();
            formdata.append("email", users.email);
            formdata.append("password", users.password);
            try {
                const response = await axiosInstance.post(
                    "/user/signin",

                    formdata,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                if (response.data.status === 200) {
                    timeoutRef.current = setTimeout(() => {
                        toast(response.data.message);
                        login();
                        navigate("/productlist");
                        setLoading(false);
                    }, 1000);
                } else if (response.data.status === 201) {
                    toast(response.data.message);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Validation failed");
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <>
            <div className="flex items-center justify-center h-calc-100vh-200px ">
                <div className=" p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                type="email"
                                onChange={postUserData}
                                value={users.email}
                                name="email"
                                id="email"
                            />
                            {error.email && (
                                <span className="text-red-700 text-sm">
                                    {error.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                type="password"
                                onChange={postUserData}
                                value={users.password}
                                name="password"
                                id="password"
                            />
                            {error.password && (
                                <span className="text-red-700 text-sm">
                                    {error.password}
                                </span>
                            )}
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {loading ? "Logging in..." : "Login"}{" "}
                        </button>
                    </form>
                    <p>
                        Not registered?{" "}
                        <Link to={"/reg"} className="text-green-900">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
