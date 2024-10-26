import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import MenuCard from "../Kitchen/MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../utils/customerSlice";
import CartSidebar from "./cartSidebar";


const KitchenDetails = () => {
  const { id } = useParams();
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItemsCount = useSelector((state) => state.customer?.cartItems);
  const totalItemCount = Object.keys(cartItemsCount).length;

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
        <div className="p-6 flex justify-between items-center ml-10 mr-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-custom-green"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            className="relative px-4 py-2 bg-custom-green text-white rounded hover:bg-emerald-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaCartPlus size={30} />
            {totalItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>


        <div className="p-6 ml-10 flex w-full">
          {kitchen.map((menuItem) => (
            <MenuCard
              key={menuItem._id}
              _id={menuItem._id}
              name={menuItem.name}
              items={menuItem.items}
              type={menuItem.type}
              price={menuItem.price}
              isFromCustomerPage={true}
              addToCart={() =>
                dispatch(addItemToCart(menuItem))
              }
            />
          ))}
        </div>
        <CartSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </React.Fragment>
  );
};

export default KitchenDetails;
