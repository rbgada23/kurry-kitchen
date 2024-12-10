import React from "react";
//ToDo : Replace with exact image
import BG_URL from "../../assets/kitchen4.avif";
import { kitchenIMG } from "../../utils/constants";

const KitchenCard = ({ kitchenName, postarPath, description, onClick }) => {
  return (
    // <div onClick={onClick} className="cursor-pointer transition-all duration-700 hover:scale-110">
      <div onClick={onClick} className="cursor-pointer hover:scale-110 duration-700 transition-all w-1/6 mr-8 bg-white border-2 rounded-lg">
        <img
          className="object-cover rounded-lg shadow-lg  cursor-pointer"
          alt="Kitchen Card"
          src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/6e44fd7f1e5cd9967edfe47c10247671"}
        />
        <div className="ml-2 text-2xl font-bold mt-2">{kitchenName}</div>
        <p className="ml-2 mt-2 mb-2 text-gray-500 text-xl font-bold">
          {description}
        </p>
      </div>
    // </div>
  );
};

export default KitchenCard;
