import React, { useEffect, useState } from "react";
import SellerDetailsForm from "./SellerDetailsForm";
import useKitchen from "../../hooks/useKitchen";
import { useSelector } from "react-redux";
import KitchenLayout from "../Kitchen/KitchenLayout";
import KitchenMenu from "../Kitchen/KitchenMenu";

const Seller = () => {

  const kitchen = useSelector((store) => store.kitchen.kitchenObj);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <KitchenLayout>
      {kitchen ? (
        <div className="w-full"></div>
      ) : (
        <SellerDetailsForm isModalOpen={isModalOpen} closeModal={closeModal} test={"test"}/>
      )}
    </KitchenLayout>
  );
};

export default Seller;
