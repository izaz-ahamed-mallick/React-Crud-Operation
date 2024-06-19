import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Utils/Helper";
import Loader from "../../../Utils/Loader";

const Reg = () => {
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
    const [isConfrmEyeOpen, setIsConfrmEyeOpen] = useState(false);

    const onSubmit = async (data, e) => {
        e.preventDefault();

        try {
            await handleSubmit(async (data) => {
                // const formdata = new FormData();
                // formdata.append("first_name", data.firstname);
                // formdata.append("last_name", data.lastname);
                // formdata.append("email", data.email);
                // formdata.append("password", data.password);

                const formdata = {};
                formdata.first_name = data.firstname;
                formdata.last_name = data.lastname;
                formdata.email = data.email;
                formdata.password = data.password;

                try {
                    const response = await axiosInstance.post(
                        "/user/signup",
                        formdata,
                        {
                            headers: { "Content-Type": "multipart/form-data" },
                        }
                    );

                    if (response.data.status === 200) {
                        toast(response.data.message);
                        const token = response.data.token;
                        console.log(response, "response");
                        console.log(token);
                        localStorage.setItem("token", token);
                        console.log(response.data);

                        navigate("/");
                        e.target.reset();
                    } else if (response.data.status === 201) {
                        toast(response.data.message);
                    }
                } catch (error) {
                    console.error("Error during API call:", error);
                }
            })(data);
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Register
                </h2>
                <form
                    onSubmit={(e) => onSubmit(getValues(), e)}
                    autoComplete="off"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="firstname"
                            className="block text-gray-700"
                        >
                            First Name
                        </label>
                        <div className="border  border-gray-300 rounded-md focus-within:border focus-within:border-blue-600 ">
                            <input
                                {...register("firstname", {
                                    required: "First name is required",
                                })}
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="w-full h-full px-3 py-2 rounded-md outline-none"
                            />
                        </div>
                        {errors.firstname && (
                            <p className="text-red-700">
                                {errors.firstname.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastname"
                            className="block text-gray-700"
                        >
                            Last Name
                        </label>
                        <div className=" border  border-gray-300 rounded-md focus-within:border focus-within:border-blue-600 ">
                            <input
                                {...register("lastname", {
                                    required: "Last name is required",
                                })}
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="w-full h-full  px-3 py-2 rounded-md outline-none"
                            />
                        </div>
                        {errors.lastname && (
                            <p className="text-red-700">
                                {errors.lastname.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <div className=" border border-gray-300 rounded-md focus-within:border focus-within:border-blue-600">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                                        message:
                                            "Please enter a valid email address",
                                    },
                                })}
                                type="email"
                                id="email"
                                name="email"
                                className="w-full h-full px-3 py-2 rounded-md outline-none "
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-700">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <div className="flex items-center px-2 border w-full bg-white  border-gray-300 rounded-md focus-within:border focus-within:border-blue-600 ">
                            <input
                                {...register("password", {
                                    required: "This field is required",

                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
                                        message:
                                            "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character and min length 6",
                                    },

                                    // validate: {
                                    //     hasUpperCase: (value) =>
                                    //         /(?=.*?[A-Z])/.test(value) ||
                                    //         "Password must contain at least one uppercase letter",
                                    //     hasLowerCase: (value) =>
                                    //         /(?=.*?[a-z])/.test(value) ||
                                    //         "Password must contain at least one lowercase letter",
                                    //     hasDigit: (value) =>
                                    //         /(?=.*?[0-9])/.test(value) ||
                                    //         "Password must contain at least one digit",
                                    //     hasSpecialChar: (value) =>
                                    //         /(?=.*?[#?!@$%^&*-])/.test(value) ||
                                    //         "Password must contain at least one special character",
                                    //     minLength: (value) =>
                                    //         value.length >= 8 ||
                                    //         "Password must be at least 8 characters long",
                                    // },
                                })}
                                type={isEyeOpen ? "text" : "password"}
                                id="password"
                                className="w-full h-full px-3 py-2 rounded-md outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setIsEyeOpen(!isEyeOpen)}
                            >
                                {isEyeOpen ? (
                                    <i className="fa-solid fa-eye"></i>
                                ) : (
                                    <i className="fa-solid fa-eye-slash"></i>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-700">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="flex items-center border bg-white w-full px-2 border-gray-300 rounded-md focus-within:border focus-within:border-blue-600 ">
                            <input
                                {...register("cnf_password", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        value === getValues("password") ||
                                        "Password dosen't match",
                                })}
                                type={isConfrmEyeOpen ? "text" : "password"}
                                className="w-full h-full px-3 py-2 rounded-md outline-none"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsConfrmEyeOpen(!isConfrmEyeOpen)
                                }
                            >
                                {isConfrmEyeOpen ? (
                                    <i className="fa-solid fa-eye"></i>
                                ) : (
                                    <i className="fa-solid fa-eye-slash"></i>
                                )}
                            </button>
                        </div>
                        {errors.cnf_password && (
                            <p className="text-red-700">
                                {errors.cnf_password.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                {...register("terms", {
                                    required: "This field is required",
                                })}
                                type="checkbox"
                                id="terms"
                                name="terms"
                                className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700">
                                I agree to the{" "}
                                <Link
                                    href="#"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    terms and conditions
                                </Link>
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-red-700">
                                {errors.terms.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-3">
                    Already have an account?{" "}
                    <Link to={"/"} className="text-blue-700 ">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Reg;
