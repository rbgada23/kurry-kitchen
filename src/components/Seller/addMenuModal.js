import React, { useState, useEffect } from 'react';

const AddMenuModal = ({ menuType, onClose }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowModal(true), 10);
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => onClose(), 300);
    };

    const handleAddMenuClick = () => {
        handleClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-out">
            <div
                className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-all duration-300 ease-out ${showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
            >
                <h2 className="text-xl font-semibold mb-4">Add New {menuType} Item</h2>

                <form className="flex flex-col justify-between h-full">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Image:
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full text-sm border border-gray-300 rounded-md p-2"
                            />
                        </label>

                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Description:
                            <textarea
                                placeholder="Enter description"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"

                            />
                        </label>

                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Rate ($):
                            <input
                                type="number"
                                placeholder="Enter rate"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>

                        <label className="block mb-4 text-sm font-medium text-gray-700">
                            Menu Type:
                            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                                <option value="jain">Jain</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="non-veg">Non-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </label>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex justify-end mt-4 space-x-4">
                        <button
                            className="py-2 px-6 rounded-lg border border-gray-400 text-black font-semibold hover:bg-gray-100"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="py-2 px-6 rounded-lg bg-custom-green text-white font-semibold hover:bg-emerald-600"
                            onClick={handleAddMenuClick}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenuModal;
