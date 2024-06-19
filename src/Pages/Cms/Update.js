import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../Utils/Helper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Utils/Loader";

const Update = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // Fetch product details for update
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(
                    `/product/detail/${id}`
                );
                const productData = response.data;
                setProduct(productData);
                // Populate the form fields
                setValue("title", productData.data.title);
                setValue("desc", productData.data.description);
                setValue("file", productData.data.image);
                // Handle file input separately if needed
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch product details");
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const updatedProduct = {
            id: id,
            title: data.title,
            description: data.desc,
            image: data.file,
        };

        try {
            // Update product
            const response = await axiosInstance.post(
                `/product/update`,
                updatedProduct,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (response.data.status === 200) {
                toast.success(response.data.message);
                navigate("/productlist");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        }
    };

    return product ? (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md"
        >
            <h1 className="text-3xl font-semibold my-4">Update Product</h1>
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
                    Update
                </button>
            </div>
        </form>
    ) : (
        <Loader />
    );
};

export default Update;
