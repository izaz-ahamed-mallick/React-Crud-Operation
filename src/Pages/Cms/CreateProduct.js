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
        const createProduct = {};
        createProduct.title = data.title;
        createProduct.description = data.desc;
        createProduct.image = data.file;

        try {
            const response = await axiosInstance.post(
                "/product/create",
                createProduct,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.status === 200) {
                toast(response.data.message);
                navigate("/productlist");
            } else if (response.data.status === 201) {
                toast(response.data.message);
            }

            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md"
        >
            <h1 className="text-3xl font-semibold my-4">Create Product</h1>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter title"
                />
                {errors.title && (
                    <p className="text-red-600">{errors.title.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    {...register("desc", {
                        required: "Description is required",
                    })}
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter description"
                ></textarea>
                {errors.desc && (
                    <p className="text-red-600">{errors.desc.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                >
                    Image URL
                </label>
                <input
                    {...register("file", { required: "Url is required" })}
                    type="text"
                    id="image"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.file && (
                    <p className="text-red-600">{errors.file.message}</p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? "Submitting..." : "Submit"}{" "}
                </button>
            </div>
        </form>
    );
};

export default CreateProduct;
