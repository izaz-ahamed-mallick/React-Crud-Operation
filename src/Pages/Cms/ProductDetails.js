import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance, { product } from "../../Utils/Helper";
import Loader from "../../Utils/Loader";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState(null);

    const getProductDetails = async () => {
        try {
            const res = await axiosInstance.get(`/product/detail/${id}`);
            console.log(res.data.data);
            setProductDetails(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    return productDetails ? (
        <div className="w-full h-screen mt-20">
            <button
                onClick={() => navigate(-1)}
                className="border px-4 py-1 m-4  hover:text-blue-500 hover:border-blue-500"
            >
                Back
            </button>
            <div className="flex gap-3 justify-center">
                <div>
                    <img
                        className="w-[400px] rounded-2xl"
                        src={product(productDetails.image)}
                        alt={productDetails.title}
                    />
                </div>
                <div className="mt-1 w-72">
                    <h1 className="text-3xl font-semibold">
                        {productDetails.title}
                    </h1>
                    <p className="text-lg">{productDetails.description}</p>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default ProductDetails;
