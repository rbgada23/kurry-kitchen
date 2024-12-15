import React from 'react'
import { MdOutlineDinnerDining } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from 'react-icons/fa6';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from "../../utils/userSlice";

export default function CustomerHeader({ cartCount, isKitchenDetailsPage, openCartSidebar }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        localStorage.clear();
        document.cookie =
            "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate("/");
        dispatch(removeUser());
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="w-full min-w-[1024px] flex bg-custom-green h-16 justify-start items-center flex-row pl-6 box-border">
            <MdOutlineDinnerDining size={60} color='white' />
            <span className="font-fantasy text-white font-extrabold text-3xl ml-2 mt-2">KURRY-KITCHEN</span>

            <div className="relative w-1/2 ml-10 flex justify-center">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                    id="search-bar-input"
                    className="flex items-center bg-white px-12 py-3 pl-10 rounded-lg text-[16px] font-normal box-border appearance-none border-0 w-full text-[#343538] h-11 outline-none"
                    placeholder="Search Kitchen"
                />
            </div>

            <div className='ml-auto flex'>
                <div onClick={openCartSidebar} className="flex cursor-pointer bg-slate-200 p-2 rounded-lg text-custom-green mr-2">
                    <FaCartPlus size={30} />
                    {cartCount > 0 && <span className='ml-2'>{cartCount}</span>}
                </div>
                <div>
                    <button onClick={() => handleLogOut()}
                        className="flex hover:bg-[#ea9e21] hover:text-white hover:shadow-2xl items-center button-override text-xl ml-5 bg-[#ce7b00] text-white rounded-lg p-2 mr-8">
                        Logout
                        <MdLogout size={20} className="ml-2" color='custom-green' />
                    </button>

                </div>
            </div>
        </div>

    )
}
