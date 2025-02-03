import React, { useState, useRef } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { API_BASE_URL, SELLER } from "../utils/constants";

import { checkValidData } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import BG_URL from "../assets/kitchenBG.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("kitchen");

  // const isSellerForm = useSelector((store) => store.form.isSellerForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      const userObj = {
        firstName: name.current.value,
        lastName: name.current.value,
        emailId: email.current.value,
        password: password.current.value,
        userType: userType,
        contactNumber: contactNumber.current.value
      };
      try {
        const response = await axios.post(
          `${API_BASE_URL}/signup`,
          userObj
        );

        if (response && response.status === 200 && response.data) {
          const userInfo = {
            email: response.data.data.emailId,
            displayName: response.data.data.firstName,
            userType: response.data.data.userType,
            userId: response.data.data._id,
            contactNumber: response.data.contactNumber
          };
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          dispatch(
            addUser(userInfo)
          );
          navigate(response.data.data.userType == SELLER ? "/kitchen/menu" : "/customer/kitchens");
        }
      } catch (error) {
        toast.error(error?.response?.data)
      }

    } else {
      const userObj = {
        emailId: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, userObj, {
          withCredentials: true,
        });
        if (response) {
          const userInfo = {
            email: response.data.emailId,
            displayName: response.data.firstName,
            userType: response.data.userType,
            userId: response.data._id
          }
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          dispatch(
            addUser(userInfo)
          );
          navigate(response.data.userType == SELLER ? "/kitchen/menu" : "/customer/kitchens");
        }

      } catch (error) {
        toast.error(error?.response?.data)
      }

    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const zipCode = useRef(null);
  const contactNumber = useRef(null);

  return (
    <div data-theme="light">
      <Header />
      <div className="absolute ">
        <img
          className="h-screen object-cover w-screen opacity-80"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-2xl shadow-2xl absolute p-12 bg-custom-green my-36 mx-auto right-0 left-0 text-white rounded-lg "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
        </h1>

        <select
          className="select text-green-700 shadow-xl mt-1 my-4 text-black select-bordered w-full bg-slate-50"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value={"kitchen"}>Seller</option>
          <option value={"customer"}>Customer</option>
        </select>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-[11px] shadow-xl my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-[11px] shadow-xl my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-[11px] shadow-xl my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
        />
        {!isSignInForm && (
          <input
            ref={zipCode}
            type="text"
            placeholder="Enter your zip code"
            className="p-[11px] my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
          />
        )}
        {!isSignInForm && (
          <input
            ref={contactNumber}
            type="text"
            placeholder="Enter your contact number"
            className="p-4 my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
          />
        )}
        {errorMessage && <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>}
        <button
          className="p-[11px] shadow-xl my-4 bg-[#ce7b00] text-white w-full rounded-lg font-bold hover:bg-[#ea9e21] hover:text-white hover:shadow-2xl"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>


        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? <React.Fragment><span>{"New to Kurry Kitchen?"}</span> <span className="text-sky-500">{"Sign Up Now"}</span></React.Fragment>
            : <React.Fragment><span>{"Already registered?"}</span> <span className="text-sky-500">{"Sign In Now."}</span></React.Fragment>}
        </p>
      </form>
    </div>
  );
};

export default Login;
