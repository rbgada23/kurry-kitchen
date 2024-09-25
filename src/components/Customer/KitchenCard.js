import React from "react";
//ToDo : Replace with exact image
import BG_URL from "../../assets/kitchen4.avif";
import { kitchenIMG } from "../../utils/constants";

const KitchenCard = ({ kitchenName, postarPath ,description}) => {
  return (
    <div className="cursor-pointer">
      <img className="w-4/5 rounded-lg object-cover " alt="Kitchen Card" src={postarPath} />
      <div className="ml-2 text-2xl font-bold mt-2">{kitchenName}</div>
      <p className="ml-2 mt-2 text-gray-500 text-xl font-bold">{description}</p>
    </div>
  );
};

export default KitchenCard;
