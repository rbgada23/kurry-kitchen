import React from 'react';
import { FaUtensils, FaShoppingBag, FaTachometerAlt } from "react-icons/fa";
import Sidebar from '../Sidebar';

export default function CustomerSidebar() {

    const menuItems = [
        { id: 1, name: "Kitchens", icon: <FaUtensils />, route: "/customer/kitchens" },
        { id: 2, name: "My Orders", icon: <FaShoppingBag />, route: "/customer/orders" },
        { id: 3, name: "Profile", icon: <FaTachometerAlt />, route: "/customer/profile" },
    ]; 

    return (
        <Sidebar menuItems={menuItems} />
    );
}
