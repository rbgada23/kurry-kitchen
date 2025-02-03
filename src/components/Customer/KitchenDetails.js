import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import MenuCard from "../Kitchen/MenuCard";
import { useSelector } from "react-redux";
import CartSidebar from "./CartSidebar";
import CustomerHeader from "./CustomerHeader";
import CustomerLayout from "./CustomerLayout";
import { API_BASE_URL } from "../../utils/constants";

const KitchenDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cartItemsCount = useSelector((state) => state.customer?.cartItems);
  const totalItemCount = cartItemsCount[id]?.length || 0;
  const kitchenName = state?.kitchenName;

  useEffect(() => {
    const fetchKitchenDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/kitchen/kitchenMenu?kitchen=${id}`,
          {
            withCredentials: true,
          }
        );

        const kitchenDetailsData = response?.data?.data.map((menu) => {
          let base64Image = null;
          if (menu?.image?.data?.data) {
            const byteArray = new Uint8Array(menu.image.data.data);
            const blob = new Blob([byteArray], { type: "image/jpeg" });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            base64Image = new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
          }

          return {
            ...menu,
            image: base64Image,
          };
        });

        // Wait for all images to resolve
        const resolvedData = await Promise.all(
          kitchenDetailsData.map(async (menu) => ({
            ...menu,
            image: await menu.image, // Wait for the image Promise
          }))
        );

        if (resolvedData && resolvedData.length) {
          console.log("kitchenDetailsData", resolvedData);
          setKitchen(resolvedData);
        }
      } catch (error) {
        console.error("Failed to process kitchen details:", error);
        setError("Failed to fetch kitchen details");
      }
    };

    fetchKitchenDetails();
  }, [id]);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CustomerLayout>
      <div>
        {kitchenName && (
          <div className="px-6 flex justify-between items-center ml-10 mr-4">
            <h3 className="text-xl cursor-pointer flex font-bold text-custom-green">
              <FaArrowLeft
                onClick={() => window.history.back()}
                className="mr-2"
              />{" "}
              {kitchenName}
            </h3>
          </div>
        )}
        <div className="p-6 ml-10 gap-4 flex flex-wrap w-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>

          {kitchen && kitchen.length && kitchen.map((menuItem) => (
            <MenuCard
              kitchenName={kitchenName}
              kitchenId={id}
              key={menuItem._id}
              _id={menuItem._id}
              name={menuItem.name}
              items={menuItem.items}
              type={menuItem.type}
              price={menuItem.price}
              image={menuItem.image}
              isFromCustomerPage={true}
            />
          ))}
        </div>
        <CartSidebar
          isFromKitchenDetails={true}
          kitchenId={id}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </CustomerLayout>
  );
};

export default KitchenDetails;
