import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { addItemToCart, removeItemFromCart } from "../../utils/customerSlice";

const MenuCard = ({ name, items, type, price, _id, isFromCustomerPage }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.customer?.cartItems);
  const cartItem = cartItems?.[_id];

  return (
    <div className="w-1/6 min-h-[350px] rounded-lg overflow-hidden shadow-lg bg-white mr-8 flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/17/ca7cc541-4ba2-48c2-8de6-f09ed033b945_62876.jpg"
            }
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 text-sm font-semibold">
            Price - ${price}
          </div>
        </div>

        <div className="p-4">
          <div className="text-lg flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-800">{name}</h2>
            {!isFromCustomerPage && (
              <FaEdit className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700" />
            )}
          </div>

          <div className="text-lg flex items-center justify-between mt-5">
            <p className="text-gray-600 text-2xl mb-2">{items}</p>
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          </div>
        </div>
      </div>

      {isFromCustomerPage && (
        <div className="p-4 mt-auto flex items-center justify-center">
          {cartItem ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(removeItemFromCart({ id: _id }))}
                className="px-3 py-1 bg-red-500 text-white rounded-l hover:bg-red-600"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => dispatch(addItemToCart({ id: _id, name, items, type, price }))}
                className="px-3 py-1 bg-green-500 text-white rounded-r hover:bg-green-600"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch(addItemToCart({ id: _id, name, items, type, price }))
              }
              className="w-full bg-custom-green text-white py-2 rounded-lg"
            >
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuCard;
