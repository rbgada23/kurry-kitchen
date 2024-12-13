import React from "react";
import KitchenLayout from "./KitchenLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
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

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Orders",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

const ordersByDayData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65, 80],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76, 99],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const sampleOrders = [
  { time: "00:00", orders: 5 },
  { time: "01:00", orders: 8 },
  { time: "02:00", orders: 3 },
  { time: "03:00", orders: 7 },
  { time: "04:00", orders: 2 },
  { time: "05:00", orders: 4 },
  { time: "06:00", orders: 10 },
  { time: "07:00", orders: 15 },
  { time: "08:00", orders: 20 },
  { time: "09:00", orders: 25 },
  { time: "10:00", orders: 30 },
  { time: "11:00", orders: 28 },
  { time: "12:00", orders: 22 },
  { time: "13:00", orders: 18 },
  { time: "14:00", orders: 19 },
  { time: "15:00", orders: 24 },
  { time: "16:00", orders: 30 },
  { time: "17:00", orders: 35 },
  { time: "18:00", orders: 40 },
  { time: "19:00", orders: 42 },
  { time: "20:00", orders: 38 },
  { time: "21:00", orders: 32 },
  { time: "22:00", orders: 20 },
  { time: "23:00", orders: 15 },
  // Repeat similar patterns to create 50 data points
  { time: "00:30", orders: 6 },
  { time: "01:30", orders: 9 },
  { time: "02:30", orders: 4 },
  { time: "03:30", orders: 8 },
  { time: "04:30", orders: 3 },
  { time: "05:30", orders: 5 },
  { time: "06:30", orders: 12 },
  { time: "07:30", orders: 16 },
  { time: "08:30", orders: 21 },
  { time: "09:30", orders: 26 },
  { time: "10:30", orders: 29 },
  { time: "11:30", orders: 25 },
  { time: "12:30", orders: 23 },
  { time: "13:30", orders: 20 },
  { time: "14:30", orders: 21 },
  { time: "15:30", orders: 27 },
  { time: "16:30", orders: 33 },
  { time: "17:30", orders: 36 },
  { time: "18:30", orders: 41 },
  { time: "19:30", orders: 39 },
  { time: "20:30", orders: 34 },
  { time: "21:30", orders: 30 },
  { time: "22:30", orders: 22 },
  { time: "23:30", orders: 17 },
];

const ordersDataByTime = {
  labels: sampleOrders.map((item) => item.time), // ['00:00', '01:00', '02:00', ...]
  datasets: [
    {
      label: "Orders by Time of Day",
      data: sampleOrders.map((item) => item.orders), // [10, 20, 5, ...]
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4, // Smooth curves
    },
  ],
};

const ordersOptionByTime = {
  scales: {
    x: { title: { display: true, text: "Time of Day" } },
    y: { title: { display: true, text: "Number of Orders" } },
  },
  plugins: {
    legend: { display: true, position: "top" },
  },
};

const ordersByLocationData = {
  labels: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  datasets: [
    {
      data: [300, 200, 150, 100, 250], // Orders from respective locations
      backgroundColor: [
        "#FF6384", // Color for New York
        "#36A2EB", // Color for Los Angeles
        "#FFCE56", // Color for Chicago
        "#4BC0C0", // Color for Houston
        "#9966FF", // Color for Phoenix
      ],
      hoverBackgroundColor: [
        "#FF6384AA",
        "#36A2EBAA",
        "#FFCE56AA",
        "#4BC0C0AA",
        "#9966FFAA",
      ],
    },
  ],
};

const doughnutOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => value, // Display raw value
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

const KitchenDashboard = () => {
  return (
    <KitchenLayout>
     <h2 className="font-bold text-center mt-1"><i>Live Data Coming soon</i></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        {/* Chart 1 */}
        <div className="bg-white p-4 rounded shadow h-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Orders by Day
          </h2>
          <div
            className="w-full "
            style={{ height: window.innerHeight / 2 - 170 }}
          >
            <Line data={ordersByDayData} />
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
           Orders By Location
          </h2>
          <div
            className="w-full "
            style={{ height: window.innerHeight / 2 - 170 }}
          >
            <Doughnut data={ordersByLocationData} options={doughnutOptions} />
          </div>
        </div>

        {/* Chart 3 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Orders by Time of the Day 
          </h2>
          <div
            className="w-full "
            style={{ height: window.innerHeight / 2 - 170 }}
          >
            <Line data={ordersDataByTime} options={ordersOptionByTime} />
          </div>
        </div>

        {/* Chart 4 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Orders
          </h2>
          <div
            className="w-full "
            style={{ height: window.innerHeight / 2 - 170 }}
          >
            {/* Replace with your chart */}
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </KitchenLayout>
  );
};

export default KitchenDashboard;
