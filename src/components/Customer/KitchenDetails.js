import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import MenuCard from "../Kitchen/MenuCard";
import { useSelector } from "react-redux";
import CartSidebar from "./cartSidebar";
import CustomerHeader from "./customerHeader";

const KitchenDetails = () => {
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cartItemsCount = useSelector((state) => state.customer?.cartItems);
  const totalItemCount = cartItemsCount[id]?.length || 0;

  useEffect(() => {
    const fetchKitchenDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/kitchen/kitchenMenu?kitchen=${id}`, {
          withCredentials: true
        });
        setKitchen(response.data.data);
      } catch (error) {
        setError("Failed to fetch kitchen details");
      } finally {
        setLoading(false);
      }
    };

    fetchKitchenDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="bg-gray-100 h-screen">
        <CustomerHeader cartCount={totalItemCount} openCartSidebar={() => setIsSidebarOpen(true)} />
        <div className="p-6 flex justify-between items-center ml-10 mr-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-custom-green"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>


        <div className="p-6 ml-10 flex w-full">
          {kitchen.map((menuItem) => (
            <MenuCard
              kitchenId={id}
              key={menuItem._id}
              _id={menuItem._id}
              name={menuItem.name}
              items={menuItem.items}
              type={menuItem.type}
              price={menuItem.price}
              isFromCustomerPage={true}
            />
          ))}
        </div>
        <CartSidebar kitchenId={id} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </React.Fragment>
  );
};

export default KitchenDetails;
