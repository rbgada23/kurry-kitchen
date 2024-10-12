import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';
import { SERVER_URL } from '../../utils/constants';

const AddMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [prevMenuList, setPrevMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [bulkItems, setBulkItems] = useState([
    {
      image: "https://clubmahindra.gumlet.io/blog/images/Khandvi-resized.jpg?w=376&dpr=2.6",
      description: "Khandavi"
    },
    {
      image: "https://clubmahindra.gumlet.io/blog/images/Khandvi-resized.jpg?w=376&dpr=2.6",
      description: "Khandavi"
    },
    {
      image: "https://www.holidify.com/images/cmsuploads/compressed/Dhokla_20180327130008.jpg",
      description: "Khaman"
    },
    {
      image: "https://clubmahindra.gumlet.io/blog/images/Fafda-Jalebi-resized.jpg?w=376&dpr=2.6",
      description: "fafda-jalebi"
    },
    {
      image: "https://blog.swiggy.com/wp-content/uploads/2023/12/Image-3-Dhokla-1024x538.png",
      description: "dhokla"
    }
  ]);

  useEffect(() => {

  }, []);

  const getPreviousMenuData = async () => {
    // const response = await fetch(`${SERVER_URL}/get-previous-menu`);
    // if (response.ok) {
    //   const menuList = await response.json();
    //   setPrevMenuList(menuList);
    //   setDataFetched(true);
    // }
    const menuList = [
      "Dal vada", "idli sambhar", "Dosa"
    ]
    setPrevMenuList(menuList);
  };

  const handleDropdownClick = () => {
    console.log("clicked")
    if (!dataFetched) {
      getPreviousMenuData();
    }
  };

  const handleCloseModal = () => {
    setIsBulkMenuOpen(false);
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: 'antiqueWhite' }}>
      <h1 className="text-3xl font-bold text-center mb-8">Menu Management</h1>

      <div className="flex justify-center space-x-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2 h-[500px] flex flex-col">
          <div className="flex-grow flex flex-col justify-between text-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Daily Menu</h2>
              <p className="text-gray-700 mb-4">
                Today's Menu
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex-shrink-0">
                <img
                  src="https://www.gujaratexpert.com/blog/wp-content/uploads/2024/01/Gujarati-Thali.jpg"
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="ml-4"> {/* Add margin-left for spacing */}
              <h3 className="text-lg font-semibold">Dosa, chutney, and sambhar</h3>
              <p className="font-semibold">Price: $30</p>
              <p className="font-semibold">Menu Type: Jain </p>
            </div>

            <button
              className="px-4 py-2 bg-custom-green text-white rounded hover:bg-emerald-600"
              onClick={() => setIsModalOpen(true)}
            >
              Add Menu
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2 h-[500px] flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">Bulk Orders</h2>
          </div>

          {/* Define a fixed height for the scrollable items area */}
          <div className="overflow-y-auto h-[350px] mb-4">
            {bulkItems.map((item, key) => (
              <div
                key={key}
                className="flex flex-row items-center border p-4 m-2 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <p className="text-center flex-1 mb-2">{item.description}</p>
                <button className="bg-red-500 text-white rounded-lg p-2 ml-4">
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Keep the button outside the scrollable area */}
          <button
            className="px-4 py-2 bg-custom-green text-white rounded hover:bg-emerald-600"
            onClick={() => setIsBulkMenuOpen(true)}
          >
            Add Items
          </button>
        </div>



      </div>





      <Modal
        shouldShow={isBulkMenuOpen}
        onRequestClose={() => handleCloseModal()}
        title="Add Bulk Items"
        onDone={() => handleCloseModal()}
      >
        <form className="flex flex-col justify-between h-full">
          <div>
            <div className="block mb-2 text-left text-sm font-medium text-gray-700">
              <label className='font-bold'>Image:</label>
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      document.getElementById('file-name').textContent = file.name;
                    } else {
                      document.getElementById('file-name').textContent = '';
                    }
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                >
                  <span>Drag and drop your image here, or click to select</span>
                </label>
                <span className="mt-2 text-sm text-gray-600" id="file-name"></span>
              </div>
            </div>

            <div className="block mb-2 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Description:</label>
              <textarea
                placeholder="Enter description"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"

              />
            </div>

            <div className="block mb-2 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Rate ($): </label>
              <input
                type="number"
                placeholder="Enter rate"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="block mb-4 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Menu Type:</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="jain">Jain</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        shouldShow={isModalOpen}
        onRequestClose={() => handleCloseModal()}
        title="Add Today's Menu"
        onDone={() => handleCloseModal()}
      >
        <div>
          <div className='text-left font-bold'>
            <label>
              Select Menu from Previous
            </label>
          </div>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            onFocus={handleDropdownClick} // Call the fetch function on focus instead of onClick
          >
            <option value="" disabled>
              Select Menu
            </option>
            {prevMenuList.length === 0 ? (
              <option value="" disabled>
                No data
              </option>
            ) : (
              prevMenuList.map((option, key) => (
                <option key={key} value={option}>
                  {option}
                </option>
              ))
            )}
          </select>


        </div>
        <div className="relative my-6">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 font-bold transform -translate-x-1/2 -top-2 bg-white px-2 text-gray-700">
            OR
          </span>
        </div>

        <form className="flex flex-col justify-between h-full">
          <div>
            <div className="block mb-2 text-left text-sm font-medium text-gray-700">
              <label className='font-bold'>Image:</label>
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      document.getElementById('file-name').textContent = file.name;
                    } else {
                      document.getElementById('file-name').textContent = '';
                    }
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                >
                  <span>Drag and drop your image here, or click to select</span>
                </label>
                <span className="mt-2 text-sm text-gray-600" id="file-name"></span>
              </div>
            </div>

            <div className="block mb-2 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Description:</label>
              <textarea
                placeholder="Enter description"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"

              />
            </div>

            <div className="block mb-2 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Rate ($): </label>
              <input
                type="number"
                placeholder="Enter rate"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="block mb-4 text-sm text-left font-medium text-gray-700">
              <label className='font-bold'>Menu Type:</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="jain">Jain</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className='text-left'>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save for later
              </button>
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AddMenu;
