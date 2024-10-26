import React from "react";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MenuCard = ({ name, items, type, price }) => {
  return (
    <div className="w-1/6 rounded-lg overflow-hidden shadow-lg bg-white mr-20">
      {/* Image section with Price overlay */}
      <div className="relative">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/17/ca7cc541-4ba2-48c2-8de6-f09ed033b945_62876.jpg"
          }
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 text-sm font-semibold">
          Price - ${price}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Name and Rating */}
        <div className="text-lg flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-800">{name}</h2>
          <FaEdit className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>

        {/* Description */}
        <div className="text-lg flex items-center justify-between mt-5">
          <p className="text-gray-600 text-2xl mb-2">{items}</p>
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
