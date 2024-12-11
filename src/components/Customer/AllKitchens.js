import React, { useState } from "react";
import { useSelector } from "react-redux";
import useKitchenList from "../../hooks/useKitchenList";
import KitchenList from "./KitchenList";
import CustomerHeader from "./CustomerHeader";
import CartSidebar from "./CartSidebar";
import CustomerLayout from "./CustomerLayout";

const AllKitchens = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useKitchenList();
  const kitchenList = useSelector((store) => store.kitchen.kitchenList);
    const cartItemsCount = useSelector((state) => state.customer?.cartItems);
  const totalItemCount = Object.keys(cartItemsCount).length;

  return (
    <CustomerLayout>
      <div className="overflow-scroll">
        {/* <CustomerHeader cartCount={totalItemCount} openCartSidebar={() => setIsSidebarOpen(true)} /> */}
        <div className="mt-0 pl-4 md:pl-20">
          <KitchenList title={"All Kitchens"} kitchenList={kitchenList} />
        </div>
        {/* <CartSidebar isCommonSidebar={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
      </div>
    </CustomerLayout>
  );
};

export default AllKitchens;
