import React from 'react';
import { FaUtensils, FaShoppingBag, FaTachometerAlt } from "react-icons/fa";
import Sidebar from '../Sidebar';

export default function KitchenSidebar() {

    const menuItems = [
        { id: 1, name: "Menu", icon: <FaUtensils />, route: "/kitchen/menu" },
        { id: 2, name: "Orders", icon: <FaShoppingBag />, route: "/kitchen/orders" },
        { id: 3, name: "Dashboard", icon: <FaTachometerAlt />, route: "/kitchen/dashboard" },
    ];

    return (
        <Sidebar menuItems={menuItems} />
    );
}
