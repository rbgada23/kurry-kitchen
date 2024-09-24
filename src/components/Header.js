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
  const isSellerForm = useSelector(store=>store.form.isSellerForm);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
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
    <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-green-500 z-10 flex flex-col md:flex-row justify-between">
      {/* ToDo : Replace with logo */}
      <div className="font-serif text-3xl text-red-500 font-bold">
        K u r r y &nbsp; K i t c h e n
      </div>
      {true && (
        <div className="flex p-2 justify-between -mt-4 md:mt-0">
          {!user &&  <button
            onClick={() => {
              handleUserSetupSelection(SELLER);
            }}
            className="button-override text-xl bg-red-100 rounded-lg px-5 py-2 border-red-700 text-red-900"
          >
            SETUP KITCHEN
          </button>}
          {!user && <button
            onClick={() => {
              handleUserSetupSelection(CUSTOMER);
            }}
            className="button-override text-xl ml-5 bg-red-100 rounded-lg px-5 py-2 border-red-700 text-red-900"
          >
            ORDER
          </button>}
          {user && <button onClick={handleSignOut} className="ml-4 font-bold text-red-900 cursor-pointer">
            Sign Out
          </button>}
        </div>
      )}
    </div>
  );
};

export default Header;
