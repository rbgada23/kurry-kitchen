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
    <div className="mt-20">
      <FilterKitchen />
      <div className="h-5/6">
        <div className="flex flex-wrap gap-6 w-full overflow-y-auto">
          {shimmerLoader ? (
            // Dynamically generate shimmer loaders based on kitchenList length
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
            // Render KitchenCard components once shimmerLoader is false
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
