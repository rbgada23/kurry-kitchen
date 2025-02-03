import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKitchen } from "../../utils/kitchenSlice";
import axios from "axios";
import useUserProfile from "../../hooks/useUserProfile";
import { API_BASE_URL } from "../../utils/constants";

const SellerDetailsForm = ({ isKitchenFormModalOpen, closeKitchenFormModal,test }) => {
  const user = useSelector((store) => store.user);
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useUserProfile();
  useEffect(() => {
    console.log(test)
    if (kitchen) {
      console.log("called closed");
      closeKitchenFormModal();
    }
  }, [kitchen]);


  const handleSubmit = (e) => {
    e.preventDefault();
    postKitchen();
  };

  const postKitchen = async () => {
    const kitchenObj = {
      name: name,
      address: address,
      contactNumber: phone,
      user: user.userId,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/kitchen`,
        kitchenObj,
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(addKitchen(response.data.data));
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div>{test}
      <dialog id="kitchen_form_modal"
        className={`modal ${isKitchenFormModalOpen ? "modal-open" : "hidden"}`}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">
            Please complete your profile to proceed
          </h3>
          <label className="form-control w-full  mt-3">
            <div className="label">
              <span className="label-text ">What would be your kitchen name?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full  bg-slate-50"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="form-control w-full  mt-3">
            <div className="label">
              <span className="label-text ">Contact Number</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full  bg-slate-50"
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label className="form-control w-full  mt-3">
            <div className="label">
              <span className="label-text ">Address</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full  bg-slate-50"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
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

export default SellerDetailsForm;
