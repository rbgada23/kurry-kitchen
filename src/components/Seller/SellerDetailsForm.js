import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKitchen } from "../../utils/kitchenSlice";
import axios from "axios";

const SellerDetailsForm = () => {
  const user = useSelector((store) => store.user);
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (kitchen) {
        document.getElementById("my_modal_1").open = false;
    }
  }, [kitchen]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
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
        "http://localhost:3001/kitchen",
        kitchenObj,
        {
          withCredentials: true, // Ensure cookies are included in the request
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
    <div>
      {" "}
      
      <dialog id="my_modal_1" className="modal ">
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

export default SellerDetailsForm;
