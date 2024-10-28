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
    <div className="mt-20">
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
