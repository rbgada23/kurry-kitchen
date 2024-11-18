import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import KitchenLayout from "./KitchenLayout";
import { SERVER_URL } from "../../utils/constants";
import { toast } from 'react-toastify';

const KitchenOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const timeout = new Promise((resolve) => setTimeout(resolve, 500));
            const [response] = await Promise.all([
                axios.get(`${SERVER_URL}/order/all`, { withCredentials: true }),
                timeout,
            ]);

            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    const handleAccept = async (order) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/order/${order._id}/accept`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toast.success('Order accepted successfully!');
            }
        } catch (error) {
            toast.error('Failed to accept the order. Please try again.')
            console.error("Error accepting the order:", error);
        }
    };

    const handleReject = async (order) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/order/${order._id}/reject`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Order rejected successfully!");
            }
        } catch (error) {
            console.error("Error rejecting the order:", error);
            toast.error("Failed to reject the order. Please try again.");
        }
    };

    return (
        <KitchenLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold text-custom-green mb-4">Kitchen Orders</h1>
                <div className="overflow-x-auto">
                    <div className="overflow-y-auto h-[85vh]">
                        {orders && orders.length ? (
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-200 sticky top-0 z-10">
                                    <tr className="text-left text-gray-700">
                                        <th className="p-4 font-semibold">Action</th>
                                        <th className="p-4 font-semibold">Order ID</th>
                                        <th className="p-4 font-semibold">User</th>
                                        <th className="p-4 font-semibold">Items</th>
                                        <th className="p-4 font-semibold">Total Amount</th>
                                        <th className="p-4 font-semibold">Delivery Address</th>
                                        <th className="p-4 font-semibold">Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-t text-gray-600 hover:bg-gray-100"
                                        >
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="p-2 bg-green-500 rounded hover:bg-green-600 text-white"
                                                        onClick={() => handleAccept(order)}
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="p-2 bg-red-500 rounded hover:bg-red-600 text-white"
                                                        onClick={() => handleReject(order)}
                                                    >
                                                        <XIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">{order._id}</td>
                                            <td className="p-4 whitespace-nowrap">{order.user_name}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                {order.items.map((item, index) => (
                                                    <div key={index}>
                                                        {item.menuItemId} (Qty: {item.quantity})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                ${order.totalAmount.$numberDecimal}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {order.deliveryAddress}
                                            </td>
                                            <td className="p-4 whitespace-nowrap capitalize">
                                                {order.orderStatus}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <div className="flex items-center justify-center h-full">
                            <h2 className="text-xl font-bold text-gray-700 mb-4">
                                No Orders available
                            </h2>
                        </div>
                        }

                    </div>
                </div>
            </div>
        </KitchenLayout>
    );
};

export default KitchenOrdersPage;
