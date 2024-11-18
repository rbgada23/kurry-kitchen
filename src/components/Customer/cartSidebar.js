import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { removeItemFromCart } from '../../utils/customerSlice';
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ kitchenId, isOpen, onClose, isCommonSidebar }) => {
    const cartItems = useSelector((state) => state.customer?.cartItems);
    const cartItemLists = isCommonSidebar ? Object.entries(cartItems) : cartItems[kitchenId];
    const totalCartItemsCount = isCommonSidebar ? cartItemLists.length : cartItems[kitchenId]?.length
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (itemId) => {
        dispatch(removeItemFromCart({ kitchenId: kitchenId, itemId: itemId }))
    };

    const handleCheckoutPage = (id) => {
        navigate(`/billing/${id}`);
    };

    return (
        <div className={`fixed right-0 top-0 w-1/4 h-full bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl text-custom-green font-bold">Cart ({totalCartItemsCount})</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <FaTimes size={20} />
                    </button>
                </div>
                {!isCommonSidebar && <React.Fragment> <div className="mt-4">
                    {totalCartItemsCount === 0 ? (
                        <div className="text-center text-gray-500">Your cart is empty</div>
                    ) : (
                        <ul className="divide-y p-2 divide-gray-200">
                            {cartItemLists && cartItemLists.length && cartItemLists.map((item, key) => (
                                <li key={key} className="flex shadow-md justify-between items-center p-4">
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
                                    <button onClick={() => handleRemove(item.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div><button
                    onClick={() => handleCheckoutPage(kitchenId)}
                    className="w-full bg-custom-green text-white py-2 rounded-lg"
                >
                        Go To Checkout
                    </button></React.Fragment>}

                {isCommonSidebar && <div>
                    <ul className="divide-y p-2 divide-gray-200">
                        {cartItemLists && cartItemLists.length && cartItemLists.map(([id, items]) => (
                            <React.Fragment key={id}>
                                <li key={id} className="flex shadow-md justify-between items-center mb-2 mt-2 p-4">
                                    <div className="flex-grow ml-4">
                                        <h3 className="font-semibold text-gray-800">{id}</h3>
                                        {items.map((item, key) => (
                                            <React.Fragment key={key}>
                                                <div className='flex'>
                                                    <img
                                                        src={
                                                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/17/ca7cc541-4ba2-48c2-8de6-f09ed033b945_62876.jpg"
                                                        }
                                                        alt={items[0].name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div key={item.id} className="mb-2 ml-4">
                                                        <h4 className="text-gray-800">{item.name}</h4>
                                                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            </React.Fragment>))}
                                    </div>
                                </li>
                                <button
                                    onClick={() => handleCheckoutPage(id)}
                                    className="w-full bg-custom-green text-white py-2 rounded-lg"
                                >
                                    Go To Checkout
                                </button>
                            </React.Fragment>))}

                    </ul></div>}


            </div>
        </div>
    );
};

export default CartSidebar;
