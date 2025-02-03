import React from "react";
import { toogleFormSelection } from "../utils/formSlice";
import { API_BASE_URL, CUSTOMER, SELLER } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import useUserProfile from "../hooks/useUserProfile";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useUserProfile();

  const handleSignOut = () => {
    localStorage.clear();
    document.cookie =
      "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/");
    dispatch(removeUser());
  };

  const handleUserSetupSelection = (e) => {
    dispatch(toogleFormSelection(e));
  };

  return (
    <div className="absolute mt-9 w-full px-8 py-4 z-10 flex flex-row items-center justify-between">
      <div className="flex-grow" />
      <div className="font-serif text-3xl text-custom-green font-bold absolute left-1/2 transform -translate-x-1/2">
        K u r r y &nbsp; K i t c h e n dev
      </div>
      {API_BASE_URL} dev
      {/* {true && (
        <div className="flex items-center p-2 justify-end">
          {!user && (
            <button
              onClick={() => {
                handleUserSetupSelection(SELLER);
              }}
              className="button-override text-xl bg-[antiquewhite] text-custom-green rounded-lg px-5 py-2 "
            >
              Setup Kitchen
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                handleUserSetupSelection(CUSTOMER);
              }}
              className="button-override text-xl ml-5 bg-[antiquewhite] text-custom-green rounded-lg px-5 py-2 "
            >
              Order
            </button>
          )}
          {user && (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-custom-green text-white rounded hover:bg-emerald-600"
            >
              Sign Out
            </button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Header;
