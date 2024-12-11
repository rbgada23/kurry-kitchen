import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar({ menuItems }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-64 text-white flex flex-col items-start p-6">
            <ul className="w-full">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.route;
                    return (
                        <li
                            key={item.id}
                            className={`flex items-center p-4 mb-4 text-xl font-semibold cursor-pointer rounded-lg 
                            ${isActive ? "bg-white text-custom-green" : "hover:bg-white hover:text-custom-green"} 
                            transition-all duration-300`}
                            onClick={() => navigate(item.route)}
                        >
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
