import React from "react";
import Reg from "./Reg";
import RegImg from "../../../Images/reg.png";

const Registration = () => {
    return (
        <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 w-full h-screen flex items-center justify-center ">
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-3">
                <div className=" w-2/4 p-4 flex justify-center">
                    <img
                        src={RegImg} // Replace with your image URL
                        alt="Decorative"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className=" w-1/2 p-4">
                    <Reg />
                </div>
            </div>
        </div>
    );
};

export default Registration;
