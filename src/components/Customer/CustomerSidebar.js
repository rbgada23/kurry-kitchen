import React from 'react';
import { FaUtensils, FaShoppingBag, FaUserAlt } from "react-icons/fa";
import Sidebar from '../Sidebar';

export default function CustomerSidebar({ isSidebarOpenClicked }) {
    const menuItems = [
        { id: 1, name: "Kitchens", icon: <FaUtensils />, route: "/customer/kitchens" },
        { id: 2, name: "My Orders", icon: <FaShoppingBag />, route: "/customer/orders" },
        { id: 3, name: "Profile", icon: <FaUserAlt />, route: "/customer/profile" },
    ];

    return (
        <Sidebar menuItems={menuItems} isSidebarOpenClicked={isSidebarOpenClicked} isFromCustomerPage={true} />
    );
}
