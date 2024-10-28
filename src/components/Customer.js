import React, { useState } from "react";
import { useSelector } from "react-redux";
import useKitchenList from "../hooks/useKitchenList";
import KitchenList from "./Customer/KitchenList";
import CustomerHeader from "./Customer/customerHeader";
import CartSidebar from "./Customer/cartSidebar";

const Customer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useKitchenList();
  const kitchenList = useSelector((store) => store.kitchen.kitchenList);
  const cartItemsCount = useSelector((state) => state.customer?.cartItems);
  const totalItemCount = Object.keys(cartItemsCount).length;

  return (
    <div className="bg-gray-100 h-screen">
      <CustomerHeader cartCount={totalItemCount} openCartSidebar={() => setIsSidebarOpen(true)} />
      <div className="absolute" >
        <div className=" mt-0 pl-4 md:pl-20">
          <KitchenList title={"All Kitchens"} kitchenList={kitchenList} />
        </div>
      </div>
      <CartSidebar isCommonSidebar={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Customer;
