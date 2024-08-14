import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Utils/Helper";
import bg from "../../../Images/regBg.jpeg";

const Registration = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isConfirmEyeOpen, setIsConfirmEyeOpen] = useState(false);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("first_name", data.firstname);
        formData.append("last_name", data.lastname);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("profile_pic", data.profile_image[0]);

        try {
            const response = await axiosInstance.post(
                "/user/signup",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during API call:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="w-full max-w-lg p-8 my-20 bg-white bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
                    Create Your Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-gray-800 font-semibold mb-1"
                            >
                                First Name
                            </label>
                            <input
                                {...register("firstname", {
                                    required: "First name is required",
                                })}
                                type="text"
                                id="firstname"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            />
                            {errors.firstname && (
                                <p className="text-red-600 mt-1">
                                    {errors.firstname.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-gray-800 font-semibold mb-1"
                            >
                                Last Name
                            </label>
                            <input
                                {...register("lastname", {
                                    required: "Last name is required",
                                })}
                                type="text"
                                id="lastname"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            />
                            {errors.lastname && (
                                <p className="text-red-600 mt-1">
                                    {errors.lastname.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-800 font-semibold mb-1"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            })}
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        />
                        {errors.email && (
                            <p className="text-red-600 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-800 font-semibold mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
                                        message:
                                            "Password must include uppercase, lowercase, number, and special character",
                                    },
                                })}
                                type={isEyeOpen ? "text" : "password"}
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setIsEyeOpen(!isEyeOpen)}
                            >
                                {isEyeOpen ? (
                                    <i className="fas fa-eye"></i>
                                ) : (
                                    <i className="fas fa-eye-slash"></i>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-600 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="cnf_password"
                            className="block text-gray-800 font-semibold mb-1"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("cnf_password", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === getValues("password") ||
                                        "Passwords do not match",
                                })}
                                type={isConfirmEyeOpen ? "text" : "password"}
                                id="cnf_password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() =>
                                    setIsConfirmEyeOpen(!isConfirmEyeOpen)
                                }
                            >
                                {isConfirmEyeOpen ? (
                                    <i className="fas fa-eye"></i>
                                ) : (
                                    <i className="fas fa-eye-slash"></i>
                                )}
                            </button>
                        </div>
                        {errors.cnf_password && (
                            <p className="text-red-600 mt-1">
                                {errors.cnf_password.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="profile_image"
                            className="block text-gray-800 font-semibold mb-1"
                        >
                            Profile Image
                        </label>
                        <input
                            {...register("profile_image", {
                                required: "Please upload a profile image",
                            })}
                            type="file"
                            id="profile_image"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            accept="image/*"
                        />
                        {errors.profile_image && (
                            <p className="text-red-600 mt-1">
                                {errors.profile_image.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            {...register("terms", {
                                required: "You must agree to the terms",
                            })}
                            type="checkbox"
                            id="terms"
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-gray-800">
                            I agree to the{" "}
                            <Link
                                to="/terms"
                                className="text-blue-600 hover:underline"
                            >
                                Terms and Conditions
                            </Link>
                        </label>
                        {errors.terms && (
                            <p className="text-red-600 mt-1">
                                {errors.terms.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Register
                        </button>
                    </div>
                    <p className="text-center text-gray-700">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;
