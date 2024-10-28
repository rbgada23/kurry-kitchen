import { useState, useRef } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { SELLER } from "../utils/constants";

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

  const isSellerForm = useSelector((store) => store.form.isSellerForm);
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
        userType: isSellerForm,
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/signup",
          userObj
        );

        if (response && response.status === 200 && response.data) {
          const userInfo = {
            email: response.data.data.emailId,
            displayName: response.data.data.firstName,
            userType: response.data.data.userType,
            userId: response.data.data._id
          };
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          dispatch(
            addUser(userInfo)
          );
          navigate(response.data.data.userType == SELLER ? "/kitchen" : "/customer");
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
        const response = await axios.post('http://localhost:3001/login', userObj, {
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
          navigate(response.data.userType == SELLER ? "/kitchen" : "/customer");
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

  return (
    <div data-theme="light">
      <Header />
      {/* <Toaster  children={"Sign up succesfull"} variant={"error"} /> */}
      <div className="absolute ">
        <img
          className="h-screen object-cover w-screen opacity-80"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-custom-green my-36 mx-auto right-0 left-0 text-white rounded-lg "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
          {isSellerForm === SELLER ? "- Kitchen" : "- Customer"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-white border text-black rounded-lg hover:border-green-200"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
        />
        {!isSignInForm && (
          <input
            ref={zipCode}
            type="text"
            placeholder="Enter your zip code"
            className="p-4 my-4 w-full bg-white border text-green-700 rounded-lg hover:border-green-200"
          />
        )}
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-[antiquewhite] text-custom-green w-full rounded-lg border font-bold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Kurry Kitchen? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
