import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./Login";
import Seller from "./Seller";
import Customer from "./Customer";
import KitchenDetails from "./Customer/KitchenDetails";
import OrderBilling from "./Customer/orderBilling";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/kitchen",
      element: (
        <ProtectedRoute>
          <Seller />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer",
      element: (
        <ProtectedRoute>
          <Customer />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kitchen/:id",
      element: (
        <ProtectedRoute>
          <KitchenDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/billing/:id",
      element: (
        <ProtectedRoute>
          <OrderBilling />
        </ProtectedRoute>
      ),
    }
  ]);


  return (
    <div>
      <RouterProvider router={appRouter} ></RouterProvider>
      <ToastContainer />
    </div>
  );
};

export default Body;
