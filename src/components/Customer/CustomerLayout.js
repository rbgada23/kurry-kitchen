import React, { useState } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerSidebar from './CustomerSidebar';
import useKitchenList from '../../hooks/useKitchenList';
import { useSelector } from 'react-redux';
import CartSidebar from './CartSidebar';

const CustomerLayout = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useKitchenList();
    const kitchenList = useSelector((store) => store.kitchen.kitchenList);
    const cartItemsCount = useSelector((state) => state.customer?.cartItems);
    const totalItemCount = Object.keys(cartItemsCount).length;
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="w-full">
                <CustomerHeader cartCount={totalItemCount} openCartSidebar={() => setIsSidebarOpen(true)} />
            </div>

            <div className="flex flex-1">
                <div className="w-64">
                    <CustomerSidebar />
                </div>

                <div className="flex-1 p-6 h-96">
                    {children}
                </div>
            </div>
            <CartSidebar isCommonSidebar={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default CustomerLayout;
