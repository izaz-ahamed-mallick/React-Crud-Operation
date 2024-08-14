import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Utils/Helper";
import { AuthContext } from "../../../Context/AuthProvider";
import bg from "../../../Images/loginBg.jpeg";
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

        return Object.keys(error).length === 0;
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setUsers((prevState) => ({ ...prevState, [name]: value }));
        if (name === "email") {
            setError((prevState) => ({
                ...prevState,
                email: value.length === 0 ? "Email is required" : "",
            }));
        } else if (name === "password") {
            setError((prevState) => ({
                ...prevState,
                password: value.length === 0 ? "Password is required" : "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validation()) {
            setLoading(true);

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
                        const token = response.data.token;
                        const image = response.data.data.profile_pic;
                        const name = response.data.data.first_name;

                        localStorage.setItem("token", token);
                        localStorage.setItem("image", image);
                        localStorage.setItem("name", name);
                        toast.success(response.data.message);
                        login();
                        navigate("/productlist");
                        setLoading(false);
                    }, 1000);
                } else if (response.data.status === 201) {
                    toast.error(response.data.message);
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
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium"
                        >
                            Email address
                        </label>
                        <input
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            type="email"
                            onChange={postUserData}
                            value={users.email}
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                        {error.email && (
                            <span className="text-red-500 text-sm">
                                {error.email}
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium"
                        >
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            type="password"
                            onChange={postUserData}
                            value={users.password}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                        />
                        {error.password && (
                            <span className="text-red-500 text-sm">
                                {error.password}
                            </span>
                        )}
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 font-semibold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Not registered?{" "}
                    <Link
                        to="/registration"
                        className="text-teal-700 font-semibold hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
