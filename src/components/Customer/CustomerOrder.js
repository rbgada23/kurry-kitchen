import React from "react";
import CustomerLayout from "./CustomerLayout";

const orders = [
    {
        date: "2024-11-15",
        menu: "Spaghetti Bolognese",
        quantity: 2,
        price: 12.99,
        kitchenName: "Italiano Kitchen",
    },
    {
        date: "2024-11-10",
        menu: "Chicken Curry",
        quantity: 1,
        price: 10.49,
        kitchenName: "Spicy Delights",
    },
];

export default function CustomerOrder() {
    return (
        <CustomerLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold text-custom-green mb-4">
                    Customer Orders
                </h1>
                <div className="overflow-x-auto">
                    <div className="overflow-y-auto h-[85vh]">
                        {orders && orders.length ? (
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-200 sticky top-0 z-10">
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
                                                ${order.price.toFixed(2)}
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
