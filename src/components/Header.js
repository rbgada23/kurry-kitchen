import React from "react";
import { toogleFormSelection } from "../utils/formSlice";
import { CUSTOMER, SELLER } from "../utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const isSellerForm = useSelector(store => store.form.isSellerForm);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleUserSetupSelection = (e) => {
    dispatch(toogleFormSelection(e));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, userType, zipCode } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            userType: userType,
            zipcode: zipCode,
          })
        );
        isSellerForm == SELLER ? navigate("/seller") : navigate("/customer")
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-4 z-10 flex flex-row items-center justify-between">
      {/* Invisible spacer to push buttons to the right */}
      <div className="flex-grow" />

      {/* Centered Logo */}
      <div className="font-serif text-3xl text-custom-green font-bold absolute left-1/2 transform -translate-x-1/2">
        K u r r y &nbsp; K i t c h e n
      </div>

      {/* Buttons section, aligned to the right */}
      {true && (
        <div className="flex items-center p-2 justify-end">
          {!user && (
            <button
              onClick={() => {
                handleUserSetupSelection(SELLER);
              }}
              className="button-override text-xl bg-[antiquewhite] text-custom-green rounded-lg px-5 py-2 "
            >
              SETUP KITCHEN
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                handleUserSetupSelection(CUSTOMER);
              }}
              className="button-override text-xl ml-5 bg-[antiquewhite] text-custom-green rounded-lg px-5 py-2 "
            >
              ORDER
            </button>
          )} 
          {user && (
            <button
              onClick={handleSignOut}
              className="p-3 my-6 bg-custom-green text-white w-full rounded-lg border font-bold hover:bg-emerald-600"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>

  );
};

export default Header;
