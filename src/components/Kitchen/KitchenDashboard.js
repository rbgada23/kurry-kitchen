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
  const [orders, setOrders] = useState([]); // Raw orders data
  const [ordersByDay, setOrdersByDay] = useState(null); // Orders grouped by day
  const [ordersByTime, setOrdersByTime] = useState(null); // Orders grouped by time
  const [menuItemStats, setMenuItemStats] = useState(null); // Stats by menu items

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


  const getOrdersByDay = (orders) => {
    const groupedByDay = orders.reduce((acc, order) => {
      const day = new Date(order.createdAt).toLocaleString("en-US", { weekday: "short" });
      acc[day] = (acc[day] || 0) + 1; // Increment count for the day
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedByDay), // ["Mon", "Tue", "Wed", ...]
      values: Object.values(groupedByDay), // [10, 15, 20, ...]
    };
  };

  const getOrdersByTime = (orders) => {
    const groupedByTime = orders.reduce((acc, order) => {
      const hour = new Date(order.createdAt).getHours(); // Extract hour (0-23)
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedByTime).map((hour) => `${hour}:00`), // ["0:00", "1:00", ...]
      values: Object.values(groupedByTime), // [5, 10, 15, ...]
    };
  };

  const getMenuItemStats = (orders) => {
    console.log("Raw Orders:", orders); // Debug: Inspect data structure
  
    const menuItemCount = orders.reduce((acc, order) => {
      if (Array.isArray(order.items) && order.items.length > 0) {
        order.items.forEach((item) => {
          const itemName = item.menuItemObj?.name || "Unknown Item"; // Fallback for missing name
          acc[itemName] = (acc[itemName] || 0) + (item.quantity || 0); // Fallback for missing quantity
        });
      }
      return acc;
    }, {});
  
    return {
      labels: Object.keys(menuItemCount), // Menu item names
      values: Object.values(menuItemCount), // Quantities sold
    };
  };
  

  const processInsights = (orders) => {
    setOrdersByDay(getOrdersByDay(orders));
    setOrdersByTime(getOrdersByTime(orders));
    setMenuItemStats(getMenuItemStats(orders));
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
    </KitchenLayout>
  );
};


export default KitchenDashboard;
