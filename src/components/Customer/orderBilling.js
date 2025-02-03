import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../../utils/CustomerSlice';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { API_BASE_URL } from '../../utils/constants';

const OrderBilling = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [isOrderPlaced, setOrderPlaced] = useState(false);
    const { id } = useParams();
    const cartItems = useSelector((state) => state.customer.cartItems);
    const cartItemLists = cartItems[id] || [];
    const totalAmount = cartItemLists.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const dispatch = useDispatch();
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [isAddressEditable, setIsAddressEditable] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        setLoading(true);
        const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
        try {
            const response = await axios.get(`${API_BASE_URL}/userProfile?emailId=${userEmail}`, {
                withCredentials: true,
            });
            const profile = response?.data?.data;
            console.log(profile);
            setUserId(profile._id);
            if (profile && profile.address) {
                setDeliveryAddress(profile.address);
            } else {
                setDeliveryAddress(null);  // Address is not available, so show the button
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setDeliveryAddress(null);  // Handle errors by showing the button
        } finally {
            setLoading(false);
        }
    };
    const placeOrder = async () => {
        try {
            const transformedItems = cartItemLists.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity,
                price: item.price
            }));
            const response = await axios.post(
                `${API_BASE_URL}/order`,
                {
                    kitchenId: id,
                    userId: userId,
                    items: transformedItems,
                    totalAmount: totalAmount,
                    deliveryAddress: deliveryAddress,
                    orderStatus: "pending",
                    platform: "app",
                },
                {
                    withCredentials: true,
                }
            );

            console.log("Order placed successfully:", response.data);
            toast.success("Order placed successfully");
            dispatch(clearCart(id)); // Redux action to clear cart for the kitchen
            setOrderPlaced(true); // Show thank-you note
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place the order. Please try again.");
        }
    };

    const handleSaveOrEditAdd = async () => {
        setIsAddressEditable(!isAddressEditable);
        const userEmail = JSON.parse(localStorage.getItem("user"));
        try {
            const response = await axios.put(
                `${API_BASE_URL}/updateProfile?userId=${userEmail.userId}`,
                { address: deliveryAddress },
                {
                    withCredentials: true,
                }
            );
            if (response?.data?.message) {
                console.log("Profile updated successfully");
                // You can add success message display here or redirect
            }
        } catch (err) {
            console.log("Error updating profile:", err.message);
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
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
            {!isOrderPlaced ? (
                <React.Fragment>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-1/2">
                        <h2 className="text-xl text-custom-green font-semibold mb-4">Delivery Address</h2>
                        <div>
                            <div className="mt-4">
                                {(isAddressEditable) ? <input
                                    readOnly={!isAddressEditable}
                                    type="text"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-2 border border-gray-300 text-custom-green rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                                /> : (<p className='text-black'>{deliveryAddress}</p>)}
                            </div>
                            <button
                                onClick={() => handleSaveOrEditAdd()}
                                className="bg-custom-green text-white py-2 px-4 rounded-lg mt-2"
                            >
                                {isAddressEditable ? "Save Address" : deliveryAddress ? "Edit Address" : "Add Address"}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-1/2">
                        <h2 className="text-xl text-custom-green font-semibold mb-4">Order Summary</h2>
                        {cartItemLists && cartItemLists.length ? <ul className="divide-y p-2 divide-gray-200">
                            {cartItemLists.map((item, key) => (
                                <li key={key} className="flex shadow-md justify-between items-center p-4">
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
                                </li>
                            ))}
                        </ul> : <div className="flex flex-col items-center justify-center h-48 bg-gray-100">
                            <HiOutlineShoppingCart className="text-6xl text-gray-500 mb-4" />
                            <p className="text-xl text-gray-700 font-semibold">Your cart is empty</p>
                        </div>
                        }
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
                        <h2 className="text-xl text-custom-green font-semibold mb-4">Total Price</h2>
                        <p className="text-lg font-bold text-black">${totalAmount}</p>
                    </div>
                    <button
                        onClick={placeOrder}
                        className={`w-1/2 mt-4 ${cartItemLists.length ? 'bg-custom-green' : 'bg-slate-400'} text-white py-2 rounded-lg`}
                        disabled={!deliveryAddress || cartItemLists.length === 0}
                    >
                        Place Order
                    </button>
                </React.Fragment>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-2xl text-custom-green font-bold mb-4">Thank You!</h2>
                    <p className="text-lg">Your order has been placed successfully.</p>
                    <button
                        onClick={() => navigate('/customer/kitchens')}
                        className="bg-custom-green text-white py-2 px-4 rounded-lg mt-2"
                    >
                        Go to Home Page
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderBilling;
