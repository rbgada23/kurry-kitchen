import React, { useState, useEffect } from "react";
import KitchenCard from "./KitchenCard";
import FilterKitchen from "./FilterKitchen";
import { useNavigate } from "react-router-dom";
import { ShimmerDiv } from "shimmer-effects-react";

const KitchenList = ({ title, kitchenList }) => {
  const navigate = useNavigate();
  const [shimmerLoader, setShimmerLoader] = useState(true);

  const handleCardClick = (kitchenId, name) => {
    navigate(`/kitchen/${kitchenId}`, { state: { kitchenName: name } });
  };

  useEffect(() => {
    setTimeout(() => {
      setShimmerLoader(false);
    }, 300);
  }, []);

  return (
    <div className="">
      <FilterKitchen />
      <div className="h-5/6">
        <h1 className="text-2xl font-semibold text-custom-green mb-4">
        Find Your Favorite Kitchen Today!
        </h1>
        <div className="flex flex-wrap gap-6 w-full overflow-y-auto">
          {shimmerLoader ? (
            kitchenList?.map((_, index) => (
              <ShimmerDiv
                key={index}
                mode="light"
                height={300}
                width={350}
                className="mr-5"
              />
            ))
          ) : (
            kitchenList?.map((kitchen) => (
              <KitchenCard
                onClick={() => handleCardClick(kitchen._id, kitchen.name)}
                key={kitchen._id}
                kitchenName={kitchen.name}
                postarPath={kitchen.postarPath}
                description={kitchen.address}
                image={kitchen.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenList;
