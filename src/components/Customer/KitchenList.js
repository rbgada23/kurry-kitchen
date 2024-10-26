import React from "react";
import KitchenCard from "./KitchenCard";
import FilterKitchen from "./FilterKitchen";
import { useNavigate } from "react-router-dom";

const KitchenList = ({ title, kitchenList }) => {
  const navigate = useNavigate();

  const handleCardClick = (kitchenId) => {
    navigate(`/kitchen/${kitchenId}`);
  };

  return (
    <div className="">
      <h1 className="text-lg md:text-4xl py-4 mb-6 text-white font-bold ">{title}</h1>
      <FilterKitchen />
      <div className="flex ">
        <div className="flex">
          {kitchenList?.map((kitchen) => (
            <KitchenCard
              onClick={() => handleCardClick(kitchen._id)}
              key={kitchen._id}
              kitchenName={kitchen.name}
              postarPath={kitchen.postarPath}
              description={kitchen.address}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default KitchenList;
