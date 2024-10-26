import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const OrderBilling = () => {
    // Sample data
    const deliveryAddress = {
        name: "John Doe",
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        phone: "(555) 123-4567",
    };

    const cartItems = useSelector((state) => state.customer.cartItems);
    const totalAmount = Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className='flex items-center text-custom-green w-1/2 justify-between mb-6'>
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-custom-blue"
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>
                <h1 className="text-2xl text-custom-green font-bold mx-auto flex-grow text-center">Billing Information</h1>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-1/2">
                <h2 className="text-xl text-custom-green font-semibold mb-4">Delivery Address</h2>
                <p>{deliveryAddress.name}</p>
                <p>{deliveryAddress.street}</p>
                <p>{`${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zip}`}</p>
                <p>{deliveryAddress.phone}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-1/2">
                <h2 className="text-xl text-custom-green font-semibold mb-4">Your Cart</h2>
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
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
                <h2 className="text-xl text-custom-green font-semibold mb-4">Total Price</h2>
                <p className="text-lg font-bold">${totalAmount}</p>
            </div>

            <button
                className="w-1/2 mt-4 bg-custom-green text-white py-2 rounded-lg"
            >
                Place Order
            </button>
        </div>
    );
};

export default OrderBilling;
