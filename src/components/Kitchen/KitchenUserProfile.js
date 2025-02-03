import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import KitchenLayout from "./KitchenLayout";
import useKitchen from "../../hooks/useKitchen";
import { ShimmerButton, ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/constants";

export default function KitchenUserProfile() {
    useKitchen();
    const kitchen = useSelector((store) => store.kitchen.kitchenObj);
    const [shimmerLoading, setShimmerLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: "",
        address: "",
        zipcode: "",
        contactNumber: "",
        logo: "",
    });

    useEffect(() => {
        if (kitchen?._id) {
            getUserProfile();
        }
    }, [kitchen]);

    useEffect(() => {
        setTimeout(() => {
            setShimmerLoading(false);
        }, 300);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxFileSize = 35 * 1024;
            if (file.size > maxFileSize) {
                toast.error("File size exceeds 30KB. Please upload a smaller file.");
                return; // Exit the function if the file is too large
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    logo: reader.result, // Update profile.logo with the uploaded image
                }));
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };


    const getUserProfile = async () => {
        // Fetch profile data (placeholder for now)
        try {
            const response = await axios.get(
                `${API_BASE_URL}/kitchen/profile?kitchenId=${kitchen._id}`,
                {
                    withCredentials: true,
                }
            );
            const result = await response?.data?.data;
            setProfile(result);
        } catch (err) {
            console.log(err.message);
        }

    };

    const handleProfileSave = async () => {
        try {
            const data = new FormData();
            data.append("name", profile.name);
            data.append("address", profile.address);
            data.append("image", document.getElementById("profile-image-upload").files[0]);

            const response = await axios.put(
                `${API_BASE_URL}/kitchen/profile?kitchenId=${kitchen._id}`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data", // Ensure the correct header for file uploads
                    }
                }
            );
            console.log("Profile updated:", response.data);
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Error saving profile");
        }
    };


    return (
        <KitchenLayout>
            <div className="flex flex-col p-6">
                <h1 className="text-2xl font-bold text-custom-green mb-6">Edit Profile</h1>

                {/* Profile Image Section */}
                <div className="flex flex-col items-center mb-6">
                    {shimmerLoading ? <ShimmerDiv mode="light" height={100} width={100} rounded={50} /> :
                        <img
                            src={profile.logo || "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
                        />}
                    {shimmerLoading ? <ShimmerButton className="mt-3" size="md" mode="light" /> :
                        <label className="mt-4 text-sm font-medium text-gray-600">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="profile-image-upload"
                            />
                            <button
                                onClick={() => document.getElementById("profile-image-upload").click()}
                                className="bg-custom-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                            >
                                Upload Kitchen LOGO
                            </button>
                        </label>}
                </div>

                {/* Input Fields */}
                <div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Contact Number
                                </label>
                                <input
                                    readOnly
                                    type="number"
                                    name="contactNumber"
                                    value={profile.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter your contact number"
                                    className="w-full px-4 py-2 border border-gray-300 bg-gray-200 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-not-allowed"
                                />
                            </div>}
                        {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Kitchen Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                                />
                            </div>}
                        {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                                />
                            </div>}
                    </div>
                    <div className="mt-6 flex">
                        {shimmerLoading ? <ShimmerButton size="md" mode="light" /> :
                            <button
                                onClick={() => handleProfileSave()}
                                className="bg-custom-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Save Profile
                            </button>}
                    </div>
                </div>
            </div>
        </KitchenLayout>
    );
}
