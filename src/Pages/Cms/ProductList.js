import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/Helper";
import { Link } from "react-router-dom";
import Loader from "../../Utils/Loader";
import SweetAlertComponent from "../../Utils/SweetAlertComponent";

const ProductList = () => {
    const [productList, setproductList] = useState(null);
    const [isDelete, setisDelete] = useState(false);
    const [id, setid] = useState();

    const getProductList = async () => {
        const data = {
            page: 1,
            perpage: 10,
        };
        try {
            const res = await axiosInstance.post("/product/list", data);
            console.log(res.data.data);
            setproductList(res.data.data);
        } catch (error) {}
    };

    useEffect(() => {
        getProductList();
    }, []);

    const removeProduct = async () => {
        try {
            const res = await axiosInstance.post("/product/remove", {
                id: id,
            });
            setisDelete(false);
            getProductList();
        } catch (error) {
            console.log(error);
        }
    };

    return productList ? (
        <div>
            <h1 className="text-2xl font-semibold mb-4 ml-2">Product List</h1>
            <div className="flex justify-end flex-row-reverse gap-4 ml-2">
                {productList.length === 0 ? (
                    <div className="text-center w-full">
                        <h1 className="text-3xl font-semibold ">
                            No Products{" "}
                        </h1>
                    </div>
                ) : (
                    productList.map((item) => (
                        <div
                            key={item._id}
                            className="w-[200px] border rounded-md text-center p-2 "
                        >
                            <Link to={`/details/${item._id}`}>
                                <img
                                    className="w-[100px] mx-auto"
                                    src={item.image}
                                    alt="no Image"
                                />
                                <h1 className="text-xl font-semibold">
                                    {item.title}
                                </h1>
                                <p>{item.description}</p>
                            </Link>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setisDelete(true);
                                        setid(item._id);
                                    }}
                                    className="bg-red-600 px-3 font-semibold text-white rounded-md py-1 mt-2 hover:bg-red-700 "
                                >
                                    Remove
                                </button>
                                <button className="bg-green-600 px-3 font-semibold rounded-md text-white py-1 mt-2 hover:bg-green-700">
                                    <Link to={`/update/${item._id}`}>
                                        Update
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isDelete && (
                <SweetAlertComponent
                    confirm={() => removeProduct()}
                    cancle={() => setisDelete(false)}
                    title={"Are you sure?"}
                    subtitle={"You will not be able to recover!"}
                />
            )}
        </div>
    ) : (
        <Loader />
    );
};

export default ProductList;
