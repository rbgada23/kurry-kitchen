import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addKitchenMenu } from "../../utils/kitchenSlice";
import { toast } from "react-toastify";
import { MdFileUpload } from "react-icons/md";
import { API_BASE_URL } from "../../utils/constants";

const MenuForm = ({ isModalOpen, closeModal, isEdit, menuData }) => {
  const [name, setName] = useState(isEdit ? menuData.name : "");
  const [type, setType] = useState(isEdit ? menuData.type : "Vegeterian");
  const [price, setPrice] = useState(isEdit ? menuData.price : "");
  const [items, setItems] = useState(isEdit ? menuData.items : "");
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);

  const handleCancel = () => {
    closeModal();
    resetFields();
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setFileName(file.name); // Set the file name in state
      console.log(file.name);
    } else {
      setFileName(""); // Ensure the file name is cleared if no file is selected
    }
  };

  const resetFields = () => {
    setName("");
    setType("Vegeterian");
    setPrice("");
    setItems("");
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    if (isEdit) {
      await saveEditedMenu();
    } else {
      await postMenu();
    }
    resetFields();
  };

  const saveEditedMenu = async () => {
    const menuObj = {
      name,
      type,
      items,
      price,
      kitchen: kitchen._id,
    };
    try {
      const response = await axios.put(
        `${API_BASE_URL}/kitchen/kitchenMenu`,
        menuObj,
        {
          withCredentials: true,
        }
      );
      // if (response) {
      //   dispatch(addKitchenMenu([response.data.data]));
      //   toast.success("Menu updated successfully")
      // }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const postMenu = async () => {
    const menuObj = {
      name,
      type,
      items,
      price,
      kitchen: kitchen._id,
      image: document.getElementById("file-input").files[0],
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/kitchen/kitchenMenu`,
        menuObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response) {
        const menu = response?.data?.data;

        let base64Image = null;
  
        if (menu?.image?.data?.data) {
          const byteArray = new Uint8Array(menu.image.data.data);
          const blob = new Blob([byteArray], { type: "image/jpeg" });
          const reader = new FileReader();
  
          base64Image = await new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          });
        }
  
        const kitchenMenuData = {
          ...menu,
          image: base64Image,
        };

        dispatch(addKitchenMenu([kitchenMenuData]));
        toast.success("Menu added successfully");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div>
      <dialog
        id="menu_form_modal"
        className={`modal ${isModalOpen ? "modal-open" : "hidden"}`}
      >
        <div className="modal-box bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {isEdit ? "Update Menu" : "Add Menu"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Menu Name
              </label>
              <input
                type="text"
                placeholder="Enter menu name"
                className="input mt-1 input-bordered w-full text-black bg-slate-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Menu Type
              </label>
              <select
                className="select mt-1 text-black select-bordered w-full bg-slate-50"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Vegeterian">Vegeterian</option>
                <option value="Jain">Jain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Items
              </label>
              <textarea
                placeholder="Describe menu items"
                className="textarea text-black mt-1 textarea-bordered w-full bg-slate-50"
                value={items}
                onChange={(e) => setItems(e.target.value)}
              ></textarea>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Menu Image
            </label>
            <div className="image-upload-container mb-2">
              <input
                className="cursor-pointer"
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {fileName && (
                <div style={{ marginTop: "10px" }}>
                  <p>File Name: {fileName}</p>
                </div>
              )}
              <div className="flex">
                <MdFileUpload className="mt-1 text-sky-600" size={20} />
                <label
                  htmlFor="file-input"
                  className="ml-1 cursor-pointer text-sky-600"
                >
                  upload Image
                </label>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                style={{ paddingTop: "8px" }}
              >
                Price ($)
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="input text-black mt-1 input-bordered w-full bg-slate-50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="modal-action justify-end">
              <button
                type="button"
                className="btn bg-slate-200 text-custom-green hover:bg-slate-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn bg-custom-green text-white">
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MenuForm;
