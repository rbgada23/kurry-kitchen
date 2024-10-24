import React from "react";
import KitchenCard from "./KitchenCard";
import FilterKitchen from "./FilterKitchen";

const KitchenList = ({ title, kitchenList }) => {
  return (
    <div className="">
      <h1 className="text-lg md:text-4xl py-4 mb-6 text-white font-bold ">{title}</h1>
      <FilterKitchen/>
      <div className="flex ">
        <div className="flex">
          {kitchenList?.map((kitchen) => (
            <KitchenCard
              key={kitchen.kitchenId}
              kitchenName={kitchen.kitchenName}
              postarPath={kitchen.postarPath}
              description={kitchen.kitchenDescription}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default KitchenList;
