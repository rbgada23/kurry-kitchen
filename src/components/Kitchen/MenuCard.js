import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { addItemToCart, removeItemFromCart } from "../../utils/CustomerSlice";
import MenuForm from "./MenuForm";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { removeKitchenMenu } from "../../utils/kitchenSlice";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";


const MenuCard = ({ name, items, type, price, _id, isFromCustomerPage, kitchenId, kitchenName, image }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.customer?.cartItems);
  const cartItem = cartItems?.[kitchenId]?.find((item) => item.id === _id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    console.log(_id);
    setDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  }

  const handleConfirmDelete = async () => {
    setDeleteModalOpen(false);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/kitchen/kitchenMenu?id="+_id+"&isUpdate=2`, // 2 is for delete
        null,
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(removeKitchenMenu({ _id: _id }));
        toast.success("Menu deleted successfully")
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/6 min-h-[350px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={image || "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC"}
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
            {user?.userType !== "kitchen" && <span class="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-lg">{type}</span>}
            {!isFromCustomerPage && (
              <div className="flex">
                <FaEdit className="text-2xl text-custom-green cursor-pointer hover:text-gray-700" onClick={openModal} />
                <MdDelete className="text-2xl text-rose-700 cursor-pointer hover:text-rose-800" onClick={openDeleteModal} />
              </div>
            )}
          </div>

          <MenuForm isModalOpen={isModalOpen} closeModal={closeModal} isEdit={true} menuData={{
            name, type, price, items
          }} />

          <div className="text-lg flex items-center justify-between mt-5">
            <p className="text-gray-600 text-2xl mb-2">{items}</p>
          </div>
        </div>
      </div>

      <dialog
        open={isDeleteModalOpen}
        id="delete_warning_modal"
        className={`modal ${isDeleteModalOpen ? "modal-open" : "hidden"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeDeleteModal();
          }
        }}
      >
        <div className="modal-box bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to delete?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            This action cannot be undone. Please confirm if you wish to proceed with the deletion.
          </p>
          <div className="modal-action justify-end">
            <button
              type="button"
              className="btn bg-slate-200 text-gray-800 hover:bg-slate-300"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>

      {isFromCustomerPage && (
        <div className="p-4 mt-auto flex items-center justify-center">
          {cartItem ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(removeItemFromCart({ kitchenId: kitchenId, itemId: _id }))}
                className="px-3 py-1 bg-red-500 text-white rounded-l hover:bg-red-600"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => dispatch(addItemToCart({ kitchenId: kitchenId, kitchenName: kitchenName, item: { id: _id, name, items, type, price, image } }))}
                className="px-3 py-1 bg-green-500 text-white rounded-r hover:bg-green-600"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addItemToCart({ kitchenId: kitchenId, kitchenName: kitchenName, item: { id: _id, name, items, type, price, image } }))}
              className="w-full bg-custom-green text-white py-2 rounded-lg"
            >
              Add
            </button>
          )}
        </div>
      )
      }
    </div >
  );
};

export default MenuCard;
