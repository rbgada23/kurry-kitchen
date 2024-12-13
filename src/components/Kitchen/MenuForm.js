import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addKitchenMenu } from "../../utils/kitchenSlice";
import { toast } from 'react-toastify';

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
  }

  const handleImageChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setFileName(file.name); // Set the file name in state
      console.log(file.name);
      document.getElementById("file-input").value = null;
    } else {
      setFileName(""); // Ensure the file name is cleared if no file is selected
    }
  };

  const resetFields = () => {
    setName("");
    setType("Vegeterian");
    setPrice("")
    setItems("");
    setFileName("");
  }

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
        "http://localhost:3001/kitchen/kitchenMenu",
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
  }

  const postMenu = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("items", items);
    formData.append("price", price);
    formData.append("kitchen", kitchen._id);
    if (fileName) {
      const fileInput = document.getElementById("file-input").files[0];
      formData.append("image", fileInput);
    }


    const menuObj = {
      name,
      type,
      items,
      price,
      kitchen: kitchen._id,
      image: document.getElementById("file-input").files[0]
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/kitchen/kitchenMenu",
        menuObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(addKitchenMenu([response.data.data]));
        toast.success("Menu added successfully")
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{isEdit ? "Update Menu" : "Add Menu"}</h2>
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
            {/* <div className="image-upload-container">
              <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  border: '2px dashed #ccc',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Image preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                  <p>Drag & Drop an image here, or click to select</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                {fileName && (
                  <div className="file-name" style={{ marginTop: '10px' }}>
                    <p>File Name: {fileName}</p>
                  </div>
                )}
              </div>
            </div> */}
            <div className="image-upload-container" style={{ textAlign: 'center', padding: '20px' }}>
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              {fileName && (
                <div style={{ marginTop: '10px' }}>
                  <p>File Name: {fileName}</p>
                </div>
              )}
              <label htmlFor="file-input" style={{ cursor: 'pointer', padding: '10px 20px', background: '#007BFF', color: '#fff', borderRadius: '5px' }}>
                upload Image
              </label>

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700">
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
