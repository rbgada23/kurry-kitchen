import React from "react";
import KitchenLayout from "./KitchenLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";
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
            label: "My First Dataset",
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

const KitchenDashboard = () => {
    return (
        <KitchenLayout>
            <h1 className="text-4xl font-bold text-custom-green mb-6">
                Kitchen Dashboard
            </h1>
            <div className="flex flex-wrap lg:flex-nowrap gap-8">
                {/* Left Section */}
                <div className="flex-1 space-y-8">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Orders by Day (Line Chart)
                        </h2>
                        <div style={{ width: "100%", height: "300px" }}>
                            <Line data={ordersByDayData} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Monthly Orders (Bar Chart)
                        </h2>
                        <div style={{ width: "100%", height: "300px" }}>
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Votes Distribution (Pie Chart)
                    </h2>
                    <div className="flex-1 p-4 flex justify-center items-center">
                        <div style={{ width: "400px", height: "400px" }}>
                            <Pie data={data} />
                        </div>
                    </div>

                </div>
            </div>
        </KitchenLayout>
    );
};

export default KitchenDashboard;
