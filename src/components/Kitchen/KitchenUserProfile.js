import React, { useState, useEffect } from "react";
import axios from "axios";
import KitchenLayout from "./KitchenLayout";

export default function KitchenUserProfile() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        address: "",
        zipcode: "",
        contactNumber: "",
        profileImage: "https://via.placeholder.com/150", // Default placeholder image
    });

    useEffect(() => {
        const fetchProfile = async () => {
            await getUserProfile();
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    profileImage: reader.result, // Update profileImage with the uploaded image
                }));
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    const getUserProfile = async () => {
        // Fetch profile data (placeholder for now)
    };

    return (
        <KitchenLayout>
            <div className="flex flex-col p-6">
                <h1 className="text-2xl font-bold text-custom-green mb-6">Edit Profile</h1>

                {/* Profile Image Section */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
                    />
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
                    </label>
                </div>

                {/* Input Fields */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Email Address
                            </label>
                            <input
                                readOnly
                                type="text"
                                name="emailId"
                                value={profile.emailId}
                                placeholder="Enter your emailId"
                                className="w-full px-4 py-2 border border-gray-300 text-gray-500 bg-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Kitchen Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                            />
                        </div>
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
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Zipcode
                            </label>
                            <input
                                type="text"
                                name="zipcode"
                                value={profile.zipcode}
                                onChange={handleInputChange}
                                placeholder="Enter your zipcode"
                                className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex">
                        <button
                            onClick={() => console.log("Profile Saved", profile)}
                            className="bg-custom-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </KitchenLayout>
    );
}
