import React, { useState, useEffect } from "react";
import CustomerLayout from "./CustomerLayout";
import axios from "axios";
import { ShimmerButton, ShimmerTitle } from "shimmer-effects-react";
import { API_BASE_URL } from "../../utils/constants";

export default function CustomerProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    address: "",
    zipcode: "",
    contactNumber: "",
  });
  const [shimmerLoading, setShimmerLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await getUserProfile();
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShimmerLoading(false);
    }, 300);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const getUserProfile = async () => {
    const userEmail = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get(
        `${API_BASE_URL}/userProfile?emailId=${userEmail.email}`,
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

  const saveUserProfile = async () => {
    const userEmail = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateProfile?userId=${userEmail.userId}`,
        profile,
        {
          withCredentials: true,
        }
      );
      if (response?.data?.message) {
        console.log("Profile updated successfully");
        // You can add success message display here or redirect
      }
    } catch (err) {
      console.log("Error updating profile:", err.message);
    }
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-bold text-custom-green mb-6">Edit Profile</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                />
              </div>}
            {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                />
              </div>}
            {shimmerLoading ? <ShimmerTitle mode="light" line={1} width={80} /> :
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
                  className="w-full px-4 py-2 border border-gray-300 text-gray-500 bg-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>}
          </div>
          <div className="mt-6 flex">
            {shimmerLoading ? <ShimmerButton mode="light" line={1} width={80} /> :
              <button
                onClick={saveUserProfile} // Call the saveUserProfile function
                className="bg-custom-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save Profile
              </button>}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
