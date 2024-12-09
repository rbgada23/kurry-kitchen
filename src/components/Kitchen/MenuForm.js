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
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);

  const handleCancel = () => {
    closeModal();
    resetFields();
  }

  const handleImageChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log(file.name);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const resetFields = () => {
    setName("");
    setType("Vegeterian");
    setPrice("")
    setItems("");
    setFileName(null);
    setImagePreview(null);
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
    const menuObj = {
      name,
      type,
      items,
      price,
      kitchen: kitchen._id,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/kitchen/kitchenMenu",
        menuObj,
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(addKitchenMenu([response.data.data]));
        toast.success("Menu added successfully")
      }
      toast.success("Menu Added");
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
            <div className="image-upload-container">
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
                <label htmlFor="file-input" style={{ color: '#007bff', cursor: 'pointer' }}>
                  Choose an image
                </label>
                {fileName && (
                  <div className="file-name" style={{ marginTop: '10px' }}>
                    <p>File Name: {fileName}</p>
                  </div>
                )}
              </div>
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
