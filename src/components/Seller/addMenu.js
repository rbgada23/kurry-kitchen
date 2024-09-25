import React, { useState } from 'react';
import AddMenuModal from './addMenuModal';

const AddMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuType, setMenuType] = useState(null);

  const handleAddMenuClick = (type) => {
    setMenuType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: 'antiqueWhite' }}>
      <h1 className="text-3xl font-bold text-center mb-8">Menu Management</h1>

      <div className="flex justify-center space-x-8">
        {/* Daily Menu Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-100 min-h-[500px] flex flex-col justify-between">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Daily Menu</h2>
            <p className="text-gray-700 mb-4">
              Add items to the daily menu that customers can order.
            </p>
          </div>
          <button
            className="p-3 bg-custom-green text-white w-full rounded-lg border font-bold hover:bg-emerald-600"
            onClick={() => handleAddMenuClick('Daily Menu')}
          >
            Add Menu
          </button>
        </div>

        {/* Bulk Orders Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-100 min-h-[500px] flex flex-col justify-between">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Bulk Orders</h2>
            <p className="text-gray-700 mb-4">
              Add items that are sold in large quantities for events or parties.
            </p>
          </div>
          <button
            className="p-3 bg-custom-green text-white w-full rounded-lg border font-bold hover:bg-emerald-600"
            onClick={() => handleAddMenuClick('Bulk Orders')}
          >
            Add Menu
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddMenuModal menuType={menuType} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AddMenu;
