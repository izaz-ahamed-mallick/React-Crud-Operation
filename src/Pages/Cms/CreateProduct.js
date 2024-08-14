import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../Utils/Helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.desc);
        formData.append("image", data.file[0]);

        try {
            const response = await axiosInstance.post(
                "/product/create",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.status === 200) {
                toast.success(response.data.message);
                navigate("/productlist");
            } else if (response.data.status === 201) {
                toast.info(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-20">
            <button
                onClick={() => navigate(-1)}
                className="border px-4 py-1 m-4  hover:text-blue-500 hover:border-blue-500"
            >
                Back
            </button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200"
            >
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Create Product
                </h1>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        {...register("title", {
                            required: "Title is required",
                        })}
                        type="text"
                        id="title"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors.title.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        {...register("desc", {
                            required: "Description is required",
                        })}
                        id="description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter description"
                    ></textarea>
                    {errors.desc && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors.desc.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="image"
                    >
                        Choose Photo
                    </label>
                    <input
                        {...register("file", { required: "Photo is required" })}
                        type="file"
                        id="image"
                        className="w-full text-sm file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:font-medium hover:file:bg-blue-600"
                    />
                    {errors.file && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors.file.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M12 4V1l-1.41 1.41L10.17 4h1.83zm1.41 14.59L14 21l1.41-1.41-1.41-1.41zM4 12l3-3-1.41-1.41L1.59 12 5.59 16.41 7 15zM18 12l-3 3 1.41 1.41L22.41 12l-3.41-3.41-1.41 1.41z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
