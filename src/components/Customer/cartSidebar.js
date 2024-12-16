import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { removeItemFromCart } from '../../utils/CustomerSlice';
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const CartSidebar = ({ kitchenId, isOpen, onClose, isFromKitchenDetails }) => {
    const { id } = useParams();
    const cartItems = useSelector((state) => state.customer?.cartItems);
    const cartItemLists = id ? cartItems[id] : Object.entries(cartItems);
    const totalCartItemsCount = id ? cartItems[id]?.length : cartItemLists.length;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (itemId, kitchenId) => {
        dispatch(removeItemFromCart({ kitchenId: kitchenId, itemId: itemId }))
    };

    const handleCheckoutPage = (id) => {
        navigate(`/billing/${id}`);
    };

    return (
        <div className={`fixed right-0 top-0 w-1/4 h-full bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl text-custom-green font-bold">Review Your Order ({totalCartItemsCount})</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="mt-4">
                    {id && <React.Fragment>
                        {(totalCartItemsCount === 0 || !totalCartItemsCount) ? (<div
                            className="text-center text-gray-500 flex items-center justify-center mt-20 h-full"
                        >
                            Your cart is empty
                        </div>

                        ) : (
                            <React.Fragment>
                                <ul className="divide-y p-2 divide-gray-200">
                                    {cartItemLists && cartItemLists.length && cartItemLists.map((item, key) => (
                                        <li key={key} className="flex shadow-lg justify-between items-center p-4">
                                            <img
                                                src={item.image || "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC"}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-grow ml-4">
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <p className="text-gray-600">Price: ${item.price?.toFixed(2) * item.quantity}</p>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <button onClick={() => handleRemove(item.id, id)} className="text-red-600 hover:text-red-800">
                                                <FaTrash />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleCheckoutPage(id)}
                                    className="w-full bg-custom-green text-white py-2 rounded-lg"
                                >
                                    Go To Checkout
                                </button>
                            </React.Fragment>
                        )}
                    </React.Fragment>}
                </div>

                {!id && <div>
                    {(!cartItemLists || !cartItemLists.length) ?
                        <div
                            className="text-center text-gray-500 flex items-center mt-20 justify-center h-full"
                        >
                            Your cart is empty
                        </div>
                        :
                        <ul className="divide-y p-2 divide-gray-200">
                            {cartItemLists && cartItemLists.length && cartItemLists.map(([id, items]) => (
                                <React.Fragment key={id}>
                                    <li key={id} className="flex shadow-lg justify-between items-center mb-2 p-4">
                                        <div className="flex-grow ml-4">
                                            <h2 className="font-semibold py-3 text-lg text-custom-green">{items[0].kitchenName}</h2>
                                            {items.map((item, key) => (
                                                <React.Fragment key={key}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={item.image || "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC"}
                                                                alt={item.name}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                            <div key={item.id} className="mb-2 ml-4">
                                                                <h4 className="text-gray-800">{item.name}</h4>
                                                                <p className="text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => handleRemove(item.id, id)}
                                                            className="text-red-500 hover:text-red-700 ml-4"
                                                        >
                                                            <MdDelete size={25} />
                                                        </button>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </li>
                                    <button
                                        onClick={() => handleCheckoutPage(id)}
                                        className="w-full bg-custom-green text-white py-2 rounded-lg"
                                    >
                                        Go To Checkout
                                    </button>
                                </React.Fragment>
                            ))}
                        </ul>
                    }
                </div>}


            </div>
        </div>
    );
};

export default CartSidebar;
