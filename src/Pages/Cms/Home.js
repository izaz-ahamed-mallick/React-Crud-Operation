import React from "react";
import Login from "../Auth/Login/Login";
import HomeImg from "../../Images/Home.png";

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 w-full h-screen flex items-center justify-center ">
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-4">
                <div className="md:w-1/2 p-4 flex justify-center">
                    <img
                        src={HomeImg} // Replace with your image URL
                        alt="Decorative"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="md:w-1/2 p-4">
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default Home;
