import React, { useState, useEffect } from "react";
import CustomerLayout from "./CustomerLayout";
import axios from "axios";
import { ShimmerTable } from "shimmer-effects-react";
import { API_BASE_URL } from "../../utils/constants";

export default function CustomerOrder() {
    const [orders, setOrders] = useState([]);
    const [shimmerLoading, setShimmerLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shimmerRows, setShimmerRows] = useState(5); // Default rows for shimmer

    useEffect(() => {
        setTimeout(() => {
            setShimmerLoading(false);
        }, 300);
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/order/user/history?userId=67461bbc6c2ac94cdcc10ffa`,
                    {
                        withCredentials: true,
                    }
                );

                const transformedOrders = response.data.data.map((order) => ({
                    date: new Date(order.orderDate).toLocaleDateString(),
                    menu: Array.isArray(order.items)
                        ? order.items.map((item) => item.menuItemObj?.name || "Unknown").join(", ")
                        : order.items,
                    quantity: Array.isArray(order.items)
                        ? order.items.reduce((sum, item) => sum + item.quantity, 0)
                        : 1,
                    price: parseFloat(order.totalAmount.$numberDecimal || "0"),
                    kitchenName: order?.kitchenName, // Replace with actual kitchen name if available
                }));

                // Dynamically set shimmer rows based on fetched data length
                setShimmerRows(transformedOrders.length + 1 || 5); // Default to 5 rows if no data

                setOrders(transformedOrders);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <CustomerLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold text-custom-green mb-4">
                    Your order history
                </h1>
                <div className="overflow-x-auto">
                    <div className="overflow-y-auto h-[85vh]">
                        {shimmerLoading ? (
                            <div>
                                <ShimmerTable
                                    mode="light"
                                    row={shimmerRows}
                                    col={5}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[10, 5, 10, 5]}
                                />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full">
                                <h2 className="text-xl font-bold text-red-500 mb-4">
                                    {error}
                                </h2>
                            </div>
                        ) : orders.length ? (
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-200 top-0 z-10">
                                    <tr className="text-left text-gray-700">
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold">Menu</th>
                                        <th className="p-4 font-semibold">Quantity</th>
                                        <th className="p-4 font-semibold">Price</th>
                                        <th className="p-4 font-semibold">Kitchen Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="border-t text-gray-600 hover:bg-gray-100"
                                        >
                                            <td className="p-4 whitespace-nowrap">{order.date}</td>
                                            <td className="p-4 whitespace-nowrap">{order.menu}</td>
                                            <td className="p-4 whitespace-nowrap">{order.quantity}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                ${order.price?.toFixed(2)}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {order.kitchenName}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <h2 className="text-xl font-bold text-gray-700 mb-4">
                                    No Orders Available
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
