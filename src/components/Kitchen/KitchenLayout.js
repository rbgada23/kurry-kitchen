import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import MenuForm from "./MenuForm";
import useKitchenMenuList from "../../hooks/useKitchenMenuList";
import { useSelector } from "react-redux";

const KitchenLayout = () => {
  useKitchenMenuList();

  const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);

  return (
    <div className="flex items-center justify-center h-screen">
      {kitchenMenuList?.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-8  rounded-lg w-1/4 h-52">
          <div
            onClick={() => {
              document.getElementById("menu_form_modal")?.showModal();
            }}
            className="flex items-center text-3xl font-semibold text-custom-green mb-4 cursor-pointer"
          >
            <FaRegSquarePlus className="mr-2" />
            <span>Menu</span>
            <MenuForm />
          </div>
        </div>
      ) : (
        <span>Menu Items Present</span>
      )}
    </div>
  );
};

export default KitchenLayout;
