import React from "react";
import KitchenCard from "./KitchenCard";
import FilterKitchen from "./FilterKitchen";
import { useNavigate } from "react-router-dom";

const KitchenList = ({ title, kitchenList }) => {
  const navigate = useNavigate();

  const handleCardClick = (kitchenId, name) => {
    navigate(`/kitchen/${kitchenId}`, { state: { kitchenName: name } });
  };

  return (
    <div className="mt-20">
      <FilterKitchen />
      <div className="flex ">
        <div className="flex">
          {kitchenList && kitchenList?.map((kitchen) => (
            <KitchenCard
              onClick={() => handleCardClick(kitchen._id, kitchen.name)}
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
