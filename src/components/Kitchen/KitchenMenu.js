import React, { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import MenuForm from "./MenuForm";
import useKitchenMenuList from "../../hooks/useKitchenMenuList";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import KitchenLayout from "../Kitchen/KitchenLayout";
import SellerDetailsForm from "../Seller/SellerDetailsForm";

const KitchenMenu = () => {
    useKitchenMenuList();
    const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const kitchen = useSelector((store) => store.kitchen.kitchenObj);


    useEffect(() => {
    }, [])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>
            {kitchen ?
                <KitchenLayout>
                    <div className="flex flex-col h-full p-6">
                        <div className="flex justify-between items-center py-4">
                            <h1 className="text-2xl font-bold text-custom-green">Menu</h1>
                            <button
                                onClick={openModal}
                                className="flex items-center text-white bg-custom-green px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                <FaRegSquarePlus className="mr-2" />
                                Add Menu
                            </button>
                        </div>

                        {/* Display "No menu available" when kitchenMenuList is empty */}
                        {kitchenMenuList?.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                                        No menu available
                                    </h2>
                                    <p className="text-gray-500 mb-6">
                                        Please add a new menu to display here.
                                    </p>
                                    <button
                                        onClick={openModal}
                                        className="text-white bg-custom-green px-6 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Add Menu
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full">
                                {kitchenMenuList.map((menu) => (
                                    <MenuCard
                                        isFromCustomerPage={false}
                                        key={menu._id}
                                        name={menu.name}
                                        items={menu.items}
                                        type={menu.type}
                                        price={menu.price}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <MenuForm isModalOpen={isModalOpen} closeModal={closeModal} />
                </KitchenLayout> : <KitchenLayout><SellerDetailsForm /></KitchenLayout>}
        </React.Fragment>
    );
};

export default KitchenMenu;
