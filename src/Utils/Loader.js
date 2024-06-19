import React from "react";
import loader from "../Images/loading-loader.gif";

const Loader = () => {
    return (
        <div className="w-full h-calc-100vh-200px flex justify-center items-center">
            <img src={loader} alt="" />
        </div>
    );
};

export default Loader;
