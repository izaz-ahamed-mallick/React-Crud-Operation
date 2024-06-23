import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/Helper";
import Loader from "../../Utils/Loader";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productdetails, SetProductDetails] = useState();
    const gerProductDetails = async () => {
        try {
            const res = await axiosInstance.get(`/product/detail/${id}`);
            console.log(res.data.data);
            SetProductDetails(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        gerProductDetails();
    }, []);

    return productdetails ? (
        <div className="w-full h-calc-100vh-200px">
            <button
                onClick={() => navigate("/productlist")}
                className="border border-black px-3 py-2 m-2 rounded-md font-semibold "
            >
                Back
            </button>
            <div className="flex gap-3 justify-center ">
                <div>
                    <img
                        className="w-[400px] rounded-2xl "
                        src={productdetails.image}
                        alt=""
                    />
                </div>
                <div className="mt-1 w-72">
                    <h1 className="text-3xl font-semibold">
                        {productdetails.title}
                    </h1>
                    <p className="text-lg ">{productdetails.description}</p>
                </div>
            </div>
            ;
        </div>
    ) : (
        <Loader />
    );
};

export default ProductDetails;
