import React, { useState } from "react";
import CustomerLayout from "./CustomerLayout";

export default function CustomerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    zipcode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CustomerLayout>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
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

    </CustomerLayout>
  );
}
