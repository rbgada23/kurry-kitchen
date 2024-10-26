import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import MenuForm from "./MenuForm";
import useKitchenMenuList from "../../hooks/useKitchenMenuList";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import OrderTable from "../Orders/OrderTable";

const sampleData = [
  {
    user_name: "Misha Patel",
    order_name: "Lunch Meal",
    order_quantity: "1",
    delivery_address: "51 Main Street",
    platform: "Web App",
    total_amount: "$15.00",
  },
  {
    user_name: "Akash Rane",
    order_name: "Deal Meal",
    delivery_address: "20 Pavonia Ave",
    platform: "Web App",
    order_quantity: "1",
    total_amount: "$18.00",
  },
  {
    user_name: "Rishabh Gada",
    order_name: "Lunch Deal",
    delivery_address: "60 Skillman Ave",
    platform: "Whatsapp",
    total_amount: "$30.00",
    order_quantity: "2",
  },
  {
    user_name: "Dosan Baik",
    order_name: "Lunch Deal",
    delivery_address: "55 senat place",
    platform: "Whatsapp",
    total_amount: "$15.00",
    order_quantity: "1",
  },
  {
    user_name: "Pratik",
    order_name: "Snacks",
    delivery_address: "55 senat place",
    platform: "Whatsapp",
    total_amount: "$5.00",
    order_quantity: "1",
  },
  {
    user_name: "Virat",
    order_name: "Deal Meal",
    delivery_address: "20 Pavonia Ave",
    platform: "Web App",
    order_quantity: "1",
    total_amount: "$18.00",
  },
];

const KitchenLayout = () => {
  useKitchenMenuList();

  const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={
        kitchenMenuList?.length == 0
          ? "items-center justify-center h-screen flex"
          : "flex h-screen"
      }
    >
      {kitchenMenuList?.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-8  rounded-lg w-1/4 h-52">
          <div className="flex items-center text-3xl font-semibold text-custom-green mb-4 cursor-pointer">
            <FaRegSquarePlus className="mr-2" onClick={openModal} />
            <span>Menu</span>
            <MenuForm isModalOpen={isModalOpen} closeModal={closeModal} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="ml-10 w-full">
            <div className="flex text-lg py-4 mt-20 ml-2  text-black font-bold cursor-pointer">
              <FaRegSquarePlus className="mr-2 mt-1" onClick={openModal} />
              <span>Menu</span>
              <MenuForm isModalOpen={isModalOpen} closeModal={closeModal} />
            </div>
            <div className="flex w-full">
              {kitchenMenuList?.map((x) => (
                <MenuCard
                  isFromCustomerPage={false}
                  key={x._id}
                  name={x.name}
                  items={x.items}
                  type={x.type}
                  price={x.price}
                />
              ))}
            </div>
            <OrderTable data={sampleData} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default KitchenLayout;
