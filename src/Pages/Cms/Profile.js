import React, { useState, useEffect } from "react";
import axiosInstance, { profile_pic } from "../../Utils/Helper"; // Import your axios instance
import Loader from "../../Utils/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(
                    "/user/profile-details"
                );
                setProfile(response.data.data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                toast.error("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <Loader />;

    if (!profile)
        return <p className="text-center py-4">No Profile Data Found</p>;

    return (
        <div className="mt-20">
            <button
                onClick={() => navigate(-1)}
                className="border px-4 py-1 m-4  hover:text-blue-500 hover:border-blue-500"
            >
                Back
            </button>
            <div className="max-w-3xl mx-auto mt-14 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-3xl font-semibold mb-6">Profile Details</h1>
                <div className="flex items-center mb-6">
                    <img
                        src={
                            profile_pic(profile.profile_pic) ||
                            "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6"
                    />
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            {profile.first_name} {profile.last_name}
                        </h2>
                        <p className="text-gray-700">{profile.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
