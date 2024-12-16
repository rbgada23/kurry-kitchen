import React, { useState, useEffect } from "react";
import KitchenLayout from "./KitchenLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { SERVER_URL } from "../../utils/constants";
import io from "socket.io-client";
import { ShimmerTable } from "shimmer-effects-react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]); 
  const [ordersByDay, setOrdersByDay] = useState(null); 
  const [ordersByTime, setOrdersByTime] = useState(null); 
  const [menuItemStats, setMenuItemStats] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);



  const kitchen = useSelector((store) => store.kitchen.kitchenObj);

useEffect(() => {
    if (kitchen) {
      fetchOrders();
    }
  }, [kitchen]);

  const fetchOrders = async () => {
    try {
      const timeout = new Promise((resolve) => setTimeout(resolve, 500));
      const [response] = await Promise.all([
        axios.get(`${SERVER_URL}/order/kitchen?kitchenId=${kitchen._id}`, {
          withCredentials: true,
        }),
        timeout,
      ]);
      
      setOrders(response.data.data);
        console.log(response);
        processInsights(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  const getMenuItemStats = (orders) => {
    const menuItemCount = orders.reduce((acc, order) => {
      if (Array.isArray(order.items)) {
        // Handle items as an array
        order.items.forEach((item) => {
          const itemName = item.menuItemObj?.name || "Unknown Item";
          acc[itemName] = (acc[itemName] || 0) + (item.quantity || 1);
        });
      } else if (typeof order.items === "string") {
        // Handle items as a string, e.g., "5 Lunch Meal"
        const [quantityStr, ...menuParts] = order.items.split(" ");
        const quantity = parseInt(quantityStr, 10) || 1; // Extract quantity
        const itemName = menuParts.join(" ") || "Unknown Item"; // Extract menu name
        acc[itemName] = (acc[itemName] || 0) + quantity;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(menuItemCount),
      values: Object.values(menuItemCount),
    };
  };

  const getOrdersByDay = (orders) => {
    const groupedByDay = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      if (!isNaN(date)) {
        const day = date.toLocaleString("en-US", { weekday: "short" });
        acc[day] = (acc[day] || 0) + 1;
      } else {
        console.warn("Invalid orderDate encountered:", order.orderDate);
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedByDay),
      values: Object.values(groupedByDay),
    };
  };

  const getOrdersByTime = (orders) => {
    const groupedByTime = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      if (!isNaN(date)) {
        const hour = date.getHours();
        acc[hour] = (acc[hour] || 0) + 1;
      } else {
        console.warn("Invalid orderDate encountered:", order.orderDate);
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedByTime).map((hour) => `${hour}:00`),
      values: Object.values(groupedByTime),
    };
  };

  const getTotalRevenue = (orders) => {
    return orders
      .reduce((acc, order) => {
        const amount = parseFloat(order.totalAmount?.$numberDecimal || 0);
        return acc + amount;
      }, 0)
      .toFixed(2);
  };

  const getAverageOrderValue = (orders) => {
    const totalRevenue = parseFloat(getTotalRevenue(orders));
    const totalOrders = orders.length;
    return totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";
  };

  const processInsights = (orders) => {
    setOrdersByDay(getOrdersByDay(orders));
    setOrdersByTime(getOrdersByTime(orders));
    setMenuItemStats(getMenuItemStats(orders));
    setTotalOrders(orders.length);
    setTotalRevenue(getTotalRevenue(orders));
    setAverageOrderValue(getAverageOrderValue(orders));
  };

  const ordersByDayData = {
    labels: ordersByDay?.labels || [],
    datasets: [
      {
        label: "Orders by Day",
        data: ordersByDay?.values || [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const ordersByTimeData = {
    labels: ordersByTime?.labels || [],
    datasets: [
      {
        label: "Orders by Time of Day",
        data: ordersByTime?.values || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const menuItemStatsData = {
    labels: menuItemStats?.labels || [],
    datasets: [
      {
        data: menuItemStats?.values || [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <KitchenLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        {/* Orders by Day */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Orders by Day</h2>
          <Line data={ordersByDayData} />
        </div>

        {/* Orders by Time */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Orders by Time of Day</h2>
          <Line data={ordersByTimeData} />
        </div>

        {/* Menu Item Stats */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu Item Stats</h2>
          <Doughnut data={menuItemStatsData} />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
        {/* Total Orders */}
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">{totalOrders}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">${totalRevenue}</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">Avg Order Value</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">${averageOrderValue}</p>
        </div>
      </div>
    </KitchenLayout>
  );
};

export default KitchenDashboard;