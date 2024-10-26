import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { removeItemFromCart } from '../../utils/customerSlice';
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
    const cartItems = useSelector((state) => state.customer.cartItems);
    const totalItemCount = Object.keys(cartItems).length;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (itemId) => {
        dispatch(removeItemFromCart({ id: itemId }));
    };

    return (
        <div className={`fixed right-0 top-0 w-1/4 h-full bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl text-custom-green font-bold">Cart ({totalItemCount})</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="mt-4">
                    {totalItemCount === 0 ? (
                        <div className="text-center text-gray-500">Your cart is empty</div>
                    ) : (
                        <ul className="divide-y p-2 divide-gray-200">
                            {Object.entries(cartItems).map(([id, item]) => (
                                <li key={id} className="flex shadow-md justify-between items-center p-4">
                                    <img
                                        src={
                                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/17/ca7cc541-4ba2-48c2-8de6-f09ed033b945_62876.jpg"
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-grow ml-4">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600">Price: ${item.price.toFixed(2) * item.quantity}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <button onClick={() => handleRemove(id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={() => navigate("/billing")}
                    className="w-full bg-custom-green text-white py-2 rounded-lg"
                >
                    Go To Checkout
                </button>
            </div>
        </div>
    );
};

export default CartSidebar;
