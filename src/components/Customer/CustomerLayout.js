import React, { useState } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerSidebar from './CustomerSidebar';
import { useSelector } from 'react-redux';
import CartSidebar from './CartSidebar';
import { useParams } from 'react-router-dom';

const CustomerLayout = ({ children }) => {
    const { id } = useParams();
    const cartItems = useSelector((state) => state.customer?.cartItems);
    const cartItemLists = id ? cartItems[id] : Object.entries(cartItems);
    const totalCartItemsCount = id ? cartItems[id]?.length : cartItemLists.length;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarOpenClicked, setIsSidebarOpenClicked] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpenClicked(!isSidebarOpenClicked); // Toggle the sidebar open/close
    };

    return (
        <div className="bg-slate-50 h-screen flex flex-col">
            <div className="h-16 w-full">
                <CustomerHeader
                    cartCount={totalCartItemsCount}
                    openCartSidebar={() => setIsSidebarOpen(true)} // Open the cart sidebar
                />
            </div>

            <div className="flex flex-1 transition-all duration-300 ease-in-out">
                {/* Sidebar with transition for width */}
                <div
                    className={`h-full bg-custom-green transition-all duration-300 ease-in-out ${isSidebarOpenClicked ? 'w-64' : 'w-24'}`}
                    style={{
                        transition: 'width 0.3s ease-in-out',
                    }}
                >
                    {/* Button to toggle sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute sticky top-4 ml-7 left-4 mt-2 flex flex-col justify-between items-center w-8 h-8"
                    >
                        {/* Hamburger Icon */}
                        <div
                            className={`w-6 h-1 bg-white mb-1 transition-transform duration-300 ${isSidebarOpenClicked ? 'rotate-45 translate-y-2' : ''
                                }`}
                        ></div>
                        <div
                            className={`w-6 h-1 bg-white mb-1 transition-opacity duration-300 ${isSidebarOpenClicked ? 'opacity-0' : ''
                                }`}
                        ></div>
                        <div
                            className={`w-6 h-1 bg-white mb-1 transition-transform duration-300 ${isSidebarOpenClicked ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        ></div>
                    </button>

                    <CustomerSidebar isSidebarOpenClicked={isSidebarOpenClicked} />
                </div>

                {/* Main content area with smooth transition */}
                <div
                    className={`flex-1 p-6 h-96 transition-all duration-300 ease-in-out`}
                >
                    {children}
                </div>
            </div>

            <CartSidebar
                isCommonSidebar={true}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)} // Close the cart sidebar
            />
        </div>
    );
};

export default CustomerLayout;
