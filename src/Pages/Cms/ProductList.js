import React, { useEffect, useState } from "react";
import axiosInstance, { product } from "../../Utils/Helper";
import { Link } from "react-router-dom";
import Loader from "../../Utils/Loader";
import ConfirmationDialog from "../../Utils/DeleteConfrm";

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(false);

    const getProductList = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("/product/list", {});
            setProductList(res.data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductList();
    }, []);

    const handleDeleteClick = (id) => {
        setIsDelete(true);
        setSelectedProductId(id);
    };

    const removeProduct = async () => {
        try {
            await axiosInstance.post("/product/remove", {
                id: selectedProductId,
            });
            setProductList((prevList) =>
                prevList.filter((item) => item._id !== selectedProductId)
            );
            setIsDelete(false);
        } catch (error) {
            console.error("Failed to remove product:", error);
        }
    };

    return productList.length > 0 ? (
        <div className="p-4 mt-14">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Product List
            </h1>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <tr>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">
                            #
                        </th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">
                            Image
                        </th>
                        <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-left">
                            Title
                        </th>
                        <th className="w-5/12 py-3 px-4 uppercase font-semibold text-sm text-left">
                            Description
                        </th>
                        <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {productList.map((item, index) => (
                        <tr
                            key={item._id}
                            className="hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                        >
                            <td className="py-3 px-4 text-left border-b">
                                {index + 1}
                            </td>
                            <td className="py-3 px-4 text-left border-b">
                                <Link to={`/details/${item._id}`}>
                                    <img
                                        className="w-12 h-12 object-cover rounded-full mx-auto"
                                        src={product(item?.image)}
                                        alt="Product"
                                    />
                                </Link>
                            </td>
                            <td className="py-3 px-4 font-semibold text-left border-b">
                                <Link to={`/details/${item._id}`}>
                                    {item.title}
                                </Link>
                            </td>
                            <td className="py-3 px-4 text-left border-b">
                                {item.description}
                            </td>
                            <td className="py-3 px-4 text-left border-b">
                                <button
                                    onClick={() => handleDeleteClick(item._id)}
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700"
                                >
                                    Remove
                                </button>
                                <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-md ml-2 hover:bg-green-700">
                                    <Link to={`/update/${item._id}`}>
                                        Update
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDelete && (
                <ConfirmationDialog
                    title="Delete Product"
                    message="Are you sure you want to delete this product? This action cannot be undone."
                    onConfirm={removeProduct}
                    onCancel={() => setIsDelete(false)}
                />
            )}
            {loading && <Loader />}
        </div>
    ) : (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Product List
            </h1>
            <p className="text-center py-4">No Products Found</p>
            {loading && <Loader />}
        </div>
    );
};

export default ProductList;
