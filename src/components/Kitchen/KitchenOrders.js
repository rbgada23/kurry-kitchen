import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/outline";

import KitchenLayout from "./KitchenLayout";
import { API_BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { ShimmerTable } from "shimmer-effects-react";

const KitchenOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ordersIncoming, setIncomingOrders] = useState([]);
  const [isOrdersFetching, setIsOrdersFetching] = useState(true);
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const socket = io.connect(`${API_BASE_URL}`);

  useEffect(() => {
    if (kitchen) {
      fetchOrders();
    }
  }, [kitchen]);

  useEffect(() => {
    const handleNewOrder = (order) => {
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
        axios.get(`${API_BASE_URL}/order/kitchen?kitchenId=${kitchen._id}`, {
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

  const handleOrderStatus = async (order, type) => {
    console.log(order);
    const orderObj = {
      userContactNumber : order.userObj.contactNumber,
      userName : order.userObj.firstName
    }
    order.orderStatus = type;
    try {
      const response = await axios.put(
       `${API_BASE_URL}/order/orderStatus?id=${order._id}&orderStatus=${order.orderStatus}`,
        orderObj,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(type === "accepted" ? "Order accepted successfully!" : "Order rejected successfully");

        // Update the status in the local state without fetching the whole list again
        setOrders((prevOrders) =>
          prevOrders.map((item) =>
            item._id === order._id ? { ...item, orderStatus: type } : item
          )
        );
      }
    } catch (error) {
      toast.error("Failed to accept or reject the order. Please try again.");
      console.error("Error accepting/rejecting the order:", error);
    }
  };


  const shimmerRowCount = isOrdersFetching ? 10 : orders.length;

  return (
    <KitchenLayout>
      <div className="container mx-auto p-6">
        {!isOrdersFetching ? (
          <div className="flex mb-4">
            <span data-tip="Refresh" className="tooltip hover:bg-sky-500 bg-custom-green p-1 rounded-lg">
              <RefreshIcon
                className="w-6 h-6 text-white cursor-pointer "
                onClick={fetchOrders}
              />
            </span>
            <h1 className="text-2xl ml-3 font-semibold text-custom-green">
              Incoming Orders: {ordersIncoming.length}
            </h1>
          </div>
        ) : (
          <></>
        )}
        {isOrdersFetching ? (
          <ShimmerTable
            mode="light"
            row={shimmerRowCount}
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
                      <th className="p-4 font-semibold">Customer Name</th>
                      <th className="p-4 font-semibold">Meal Type</th>
                      <th className="p-4 font-semibold">Quantity</th>
                      <th className="p-4 font-semibold">Total Amount</th>
                      <th className="p-4 font-semibold">Delivery Address</th>
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
                            {order.orderStatus === "accepted" ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Accepted
                              </span>
                            ) : order.orderStatus === "rejected" ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                Rejected
                              </span>
                            ) : (
                              <span>
                                <button
                                  data-tip="Accept"
                                  className="tooltip ml-3 mr-2 p-1 bg-green-500 rounded hover:bg-green-600 text-white"
                                  onClick={() => handleOrderStatus(order, "accepted")}
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </button>
                                <button
                                  data-tip="Reject"
                                  className="tooltip p-1 bg-red-500 rounded hover:bg-red-600 text-white"
                                  onClick={() => handleOrderStatus(order, "rejected")}
                                >
                                  <XIcon className="h-5 w-5" />
                                </button>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          {order.userObj.firstName}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          {Array.isArray(order.items) ? (
                            order.items.map((item, index) => (
                              <div key={index}>
                                {item?.menuItemObj?.name || "Unnamed Item"}
                              </div>
                            ))
                          ) : (
                            <div>{order.items.replace(/^\d+\s*/, "")}</div>
                          )}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          {Array.isArray(order.items) ? (
                            order.items.map((item, index) => (
                              <div key={index}>{item?.quantity || "N/A"}</div>
                            ))
                          ) : (
                            <div>{order.items.match(/^\d+/)?.[0]}</div>
                          )}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          ${order.totalAmount.$numberDecimal}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          {order.deliveryAddress}
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
