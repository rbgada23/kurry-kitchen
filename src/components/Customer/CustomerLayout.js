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
        <div className="bg-slate-50 h-screen flex flex-col">
            <div className="h-16 w-full">
                <CustomerHeader cartCount={totalItemCount} openCartSidebar={() => setIsSidebarOpen(true)} />
            </div>

            <div className="flex flex-1">
                <div className="h-full bg-custom-green w-64">
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
