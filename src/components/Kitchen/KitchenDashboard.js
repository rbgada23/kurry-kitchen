import React, { useState, useEffect } from "react";
import KitchenLayout from "./KitchenLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { API_BASE_URL } from "../../utils/constants";
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
  const [topMenuItem, setTopMenuItem] = useState({ name: "None", count: 0 });
  const [ordersByPlatform, setOrdersByPlatform] = useState({});

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
        axios.get(`${API_BASE_URL}/order/kitchen?kitchenId=${kitchen._id}`, {
          withCredentials: true,
        }),
        timeout,
      ]);
  
      // Filter orders with status "accepted"
      const acceptedOrders = response.data.data.filter(
        (order) => order.orderStatus === "accepted"
      );
  
      setOrders(acceptedOrders); // Set only accepted orders
      console.log("Accepted Orders:", acceptedOrders);
      processInsights(acceptedOrders); // Pass accepted orders to insights
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  const getMenuItemStats = (orders) => {
    console.log("Orders for MenuItemStats:", orders);

    const menuItemCount = orders.reduce((acc, order) => {
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const itemName = item.menuItemObj?.name || "Unknown Item";
          console.log("Parsed Item Name (Array):", itemName);
          acc[itemName] = (acc[itemName] || 0) + (item.quantity || 1);
        });
      } else if (typeof order.items === "string") {
        const [quantityStr, ...menuParts] = order.items.split(" ");
        const quantity = parseInt(quantityStr, 10) || 1;
        const itemName = menuParts.join(" ") || "Unknown Item";
        console.log("Parsed Item Name (String):", itemName);
        acc[itemName] = (acc[itemName] || 0) + quantity;
      }
      return acc;
    }, {});

    console.log("Menu Item Stats:", menuItemCount);

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

  const getTopSellingMenuItem = (orders) => {
    const menuItemStats = getMenuItemStats(orders);

    if (menuItemStats.labels.length === 0) {
      return { name: "None", count: 0 };
    }

    const items = menuItemStats.labels.map((label, index) => ({
      name: label,
      count: menuItemStats.values[index],
    }));

    return (
      items.sort((a, b) => b.count - a.count)[0] || { name: "None", count: 0 }
    );
  };

  const getRevenueByDay = (orders) => {
    return orders.reduce((acc, order) => {
      const day = new Date(order.orderDate).toLocaleString("en-US", {
        weekday: "short",
      });
      const amount = parseFloat(order.totalAmount?.$numberDecimal || 0);
      acc[day] = (acc[day] || 0) + amount;
      return acc;
    }, {});
  };

  // Orders by Platform
  const getOrdersByPlatform = (orders) => {
    console.log("Orders for Platform Stats:", orders);

    return orders.reduce((acc, order) => {
      const platform = order.platform || "Unknown";
      console.log("Platform:", platform);
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {});
  };

  /*const processInsights = (orders) => {
    console.log("Processing Insights for Orders:", orders);
    setOrdersByDay(getOrdersByDay(orders));
    setOrdersByTime(getOrdersByTime(orders));
    setMenuItemStats(getMenuItemStats(orders));
    setTotalOrders(orders.length);
    setTotalRevenue(getTotalRevenue(orders));
    setAverageOrderValue(getAverageOrderValue(orders));
    setTopMenuItem(topItem);
    setOrdersByPlatform(platformStats);

    setTopMenuItem(topItem);

    console.log("Top Selling Menu Item:", topItem);
    
    const platformStats = getOrdersByPlatform(orders);
    console.log("Orders by Platform:", platformStats);
    setOrdersByPlatform(platformStats);
  };*/

  const processInsights = (orders) => {
    console.log("Processing Insights for Orders:", orders);

    const acceptedOrders = orders.filter((order) => order.orderStatus === "accepted");

    console.log("Accepted Orders:", acceptedOrders);

    setOrdersByDay(getOrdersByDay(orders));
    setOrdersByTime(getOrdersByTime(orders));
    setMenuItemStats(getMenuItemStats(orders));
    setTotalOrders(orders.length);
    setTotalRevenue(getTotalRevenue(orders));
    setAverageOrderValue(getAverageOrderValue(orders));
    getRevenueByDay(orders);

    const topItem = getTopSellingMenuItem(orders);
    console.log("Top Selling Menu Item:", topItem);
    setTopMenuItem(topItem);

    const platformStats = getOrdersByPlatform(orders);
    console.log("Orders by Platform:", platformStats);
    setOrdersByPlatform(platformStats);
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

  const menuItemStatsData = {
    labels: menuItemStats?.labels || [],
    datasets: [
      {
        data: menuItemStats?.values || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
<KitchenLayout>
  <div className="container mx-auto p-4">
    {/* Top Metrics Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Total Orders */}
      <div className="bg-white p-6 rounded shadow flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
        <p className="text-4xl font-bold text-indigo-600 mt-2">{totalOrders}</p>
      </div>

      {/* Total Revenue */}
      <div className="bg-white p-6 rounded shadow flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">
          ${totalRevenue}
        </p>
      </div>

      {/* Average Order Value */}
      <div className="bg-white p-6 rounded shadow flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-600">Avg Order Value</h2>
        <p className="text-4xl font-bold text-blue-600 mt-2">
          ${averageOrderValue}
        </p>
      </div>
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Orders by Day */}
      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Orders by Day
        </h2>
        <Line data={ordersByDayData} />
      </div>

      {/* Revenue by Day */}
      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Revenue by Day
        </h2>
        <Bar
          data={{
            labels: Object.keys(getRevenueByDay(orders)),
            datasets: [
              {
                label: "Revenue by Day",
                data: Object.values(getRevenueByDay(orders)),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
              },
            ],
          }}
        />
      </div>

      {/* Menu Item Stats */}
      <div className="bg-white p-4 rounded shadow w-full md:col-span-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Menu Item Stats
        </h2>
        <div className="flex justify-center">
          <Doughnut
            data={menuItemStatsData}
            options={{
              maintainAspectRatio: false,
            }}
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>

    {/* Detailed Insights Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Top Selling Menu Item */}
      <div className="bg-white p-6 rounded shadow flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-600">Top Menu Item</h2>
        <p className="text-2xl font-bold mt-2">{topMenuItem.name}</p>
        <p className="text-md text-gray-500">{topMenuItem.count} Sold</p>
      </div>

      {/* Orders by Platform */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Orders by Platform
        </h2>
        <ul>
          {Object.entries(ordersByPlatform).map(([platform, count]) => (
            <li key={platform} className="text-md">
              {platform}: <span className="font-bold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</KitchenLayout>

  );
};

export default KitchenDashboard;
