import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/outline";

import KitchenLayout from "./KitchenLayout";
import { SERVER_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { ShimmerTable } from "shimmer-effects-react";

const KitchenOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ordersIncoming, setIncomingOrders] = useState([]);
  const [isOrdersFetching, setIsOrdersFetching] = useState(true);
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const socket = io.connect("http://localhost:3001"); // Update the URL if needed

  useEffect(() => {
    fetchOrders();
  }, [kitchen]);

  useEffect(() => {
    const handleNewOrder = (order) => {
      console.log(order);
      setIncomingOrders((prevOrders) => [...prevOrders, order]); // Append the new order to the array
    };

    socket.on("newOrder", handleNewOrder);
    // Clean up the socket connection
    return () => socket.off("newOrder");
  }, []);

  const fetchOrders = async () => {
    try {
      setIsOrdersFetching(true);
      const timeout = new Promise((resolve) => setTimeout(resolve, 500));
      const [response] = await Promise.all([
        axios.get(`${SERVER_URL}/order/kitchen?kitchenId=${kitchen._id}`, {
          withCredentials: true,
        }),
        timeout,
      ]);
      setIncomingOrders([]);
      setOrders(response.data.data);
      setIsOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAccept = async (order) => {
    order.orderStatus = "accepted";
    try {
      const response = await axios.post(
        "http://localhost:3001/order?id=" + order._id,
        order,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Order accepted successfully!");
      }
      console.log(response);
    } catch (error) {
      toast.error("Failed to accept the order. Please try again.");
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
      {!isOrdersFetching ? <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-custom-green">
            Incoming Orders: {ordersIncoming.length}
          </h1>
          <RefreshIcon
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={fetchOrders} // Trigger refresh action
          />
        </div> : <></>}
        {isOrdersFetching ? (
          <ShimmerTable
            mode="light"
            row={15}
            col={5}
            height={15}
            border={0}
            rounded={0.25}
            rowGap={25}
            colGap={10}
            colPadding={[10, 20, 10, 20]}
          />
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-y-auto h-[85vh]">
              {orders && orders.length ? (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="text-left text-gray-700">
                      <th className="p-4 font-semibold">Action</th>
                      <th className="p-4 font-semibold">User</th>
                      <th className="p-4 font-semibold">Items</th>
                      <th className="p-4 font-semibold">Quantity</th>

                      <th className="p-4 font-semibold">Total Amount</th>
                      <th className="p-4 font-semibold">Delivery Address</th>
                      <th className="p-4 font-semibold">Order Status</th>
                      <th className="p-4 font-semibold">Platform</th>
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
                        <td className="p-4 whitespace-nowrap">
                          {order.userObj.firstName}
                        </td>
                        {/* <td className="p-4 whitespace-nowrap">
                                                {order.items.map((item, index) => (
                                                    <div key={index}>
                                                        {item?.menuItemObj?.name}
                                                    </div>
                                                ))}
                                            </td> */}
                        <td className="p-4 whitespace-nowrap">
                          {Array.isArray(order.items) ? (
                            // Handle structured items array (Use Case 1)
                            order.items.map((item, index) => (
                              <div key={index}>
                                {item?.menuItemObj?.name || "Unnamed Item"}{" "}
                                {/* Show menu item name or fallback */}
                              </div>
                            ))
                          ) : (
                            // Handle plain text (Use Case 2)
                            <div>{order.items}</div>
                          )}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          {Array.isArray(order.items) ? (
                            // Handle structured items array (Use Case 1)
                            order.items.map((item, index) => (
                              <div key={index}>{item?.quantity || "N/A"}</div>
                            ))
                          ) : (
                            // Handle plain text (Use Case 2)
                            <div>N/A</div>
                          )}
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
                        <td className="p-4 whitespace-nowrap capitalize">
                          {order.platform}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <h2 className="text-xl font-bold text-gray-700 mb-4">
                    No Orders available
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </KitchenLayout>
  );
};

export default KitchenOrdersPage;
