import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addKitchenMenu } from "../../utils/kitchenSlice";

const MenuForm = ({ isModalOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState("");

  const dispatch = useDispatch();

  const kitchen = useSelector((store) => store.kitchen.kitchenObj);

  const handleSubmit = (e) => {
    closeModal();
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    postMenu();
  };

  const postMenu = async () => {
    const menuObj = {
      name: name,
      type: type,
      items: items,
      price: price,
      kitchen: kitchen._id,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/kitchen/kitchenMenu",
        menuObj,
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      if (response) {
        dispatch(addKitchenMenu([response.data.data]));
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div>
      {" "}
      <dialog id="menu_form_modal" className={`modal ${isModalOpen ? 'modal-open' : 'hidden'}`}>
        <div className="modal-box bg-white">
          <form className="flex flex-col justify-between h-full">
            <div>
              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text ">Menu Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full  bg-slate-50"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text ">Menu Type</span>
                </div>
                <select
                  className="select select-bordered bg-slate-50"
                  onChange={(e) => setType(e.target.value)}
                  defaultValue={"Vegeterain"}
                >
                  <option disabled>
                    Pick one
                  </option>
                  <option>Vegeterian</option>
                  <option>Jain</option>
                </select>
              </label>
            </div>
            <div>
              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text ">Items</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24 bg-slate-50"
                  placeholder="Item Description"
                  onChange={(e) => setItems(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div>
              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text ">Price($)</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full  bg-slate-50"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-custom-green text-white"
                onClick={handleSubmit}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MenuForm;
