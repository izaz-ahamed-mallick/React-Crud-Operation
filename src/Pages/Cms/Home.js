import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login/Login";
import { AuthContext } from "../../Context/AuthProvider";

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? (
        <div
            style={{
                background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            }}
            className="text-center  flex justify-center items-center flex-col  h-screen"
        >
            <h1 className="text-2xl font-bold mb-4">
                You are already logged in!
            </h1>
            <p className="mb-4">You can view the product list now.</p>
            <Link
                to="/productlist"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                View Product List
            </Link>
        </div>
    ) : (
        <Login />
    );
};

export default Home;
