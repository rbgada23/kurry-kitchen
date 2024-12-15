import React, { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import MenuForm from "./MenuForm";
import useKitchenMenuList from "../../hooks/useKitchenMenuList";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import KitchenLayout from "../Kitchen/KitchenLayout";
import SellerDetailsForm from "../Seller/SellerDetailsForm";
import { ShimmerButton, ShimmerDiv } from "shimmer-effects-react";

const KitchenMenu = () => {
    useKitchenMenuList();
    const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isKitchenFormModalOpen, setIsKitchenFormModalOpen] = useState(true);
    const [shimmerLoader, setShimmerLoader] = useState(true);
    const kitchen = useSelector((store) => store.kitchen.kitchenObj);

    useEffect(() => {
        setTimeout(() => {
            setShimmerLoader(false);
            console.log(kitchenMenuList);
        }, 500);
        
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openKitcheFormModal = () => {
        setIsKitchenFormModalOpen(true);
    };

    const closeKitchenFormModal = () => {
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>
            {kitchen ? (
                <KitchenLayout>
                    <div className="flex flex-col p-6">
                        <div className="flex justify-between items-center py-4">
                            <h1 className="text-2xl font-bold text-custom-green">Menu Listings</h1>
                            {shimmerLoader ? (
                                <React.Fragment><ShimmerButton size="sm" mode="light" /></React.Fragment>) : kitchenMenuList?.length !== 0 ? (

                                    <button
                                        onClick={openModal}
                                        className="flex items-center text-white bg-custom-green px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        <FaRegSquarePlus className="mr-2" />
                                        Add Menu
                                    </button>) : <React.Fragment></React.Fragment>}
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
                                    {shimmerLoader ? (
                                        <React.Fragment><ShimmerButton size="sm" mode="light" /></React.Fragment>) : (
                                        <button
                                            onClick={openModal}
                                            className="text-white bg-custom-green px-6 py-2 rounded-lg hover:bg-green-600"
                                        >
                                            Add Menu
                                        </button>)}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-6 w-full p-1 overflow-y-auto">
                                {shimmerLoader ? (
                                    <React.Fragment>{Array.from({ length: kitchenMenuList?.length || 3 }).map((_, index) => (
                                        <ShimmerDiv
                                            key={index}
                                            mode="light"
                                            height={300}
                                            width={350}
                                            className="mr-5"
                                        />
                                    ))}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {kitchenMenuList.map((menu) => (
                                            <MenuCard
                                                isFromCustomerPage={false}
                                                key={menu._id}
                                                name={menu.name}
                                                items={menu.items}
                                                type={menu.type}
                                                price={menu.price}
                                                image={menu.image}
                                                _id = {menu._id}
                                            />
                                        ))}
                                    </React.Fragment>
                                )}
                            </div>
                        )}
                    </div>

                    <MenuForm isModalOpen={isModalOpen} closeModal={closeModal} />
                </KitchenLayout>
            ) : (
                <KitchenLayout>
                    <SellerDetailsForm
                        isKitchenFormModalOpen={isKitchenFormModalOpen}
                        closeKitchenFormModal={closeKitchenFormModal}
                        test={"test"}
                    />
                </KitchenLayout>
            )}
        </React.Fragment>
    );
};

export default KitchenMenu;
