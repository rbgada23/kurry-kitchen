import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./Login";
import Seller from "./Seller/Seller";
import AllKitchens from "./Customer/AllKitchens";
import KitchenDetails from "./Customer/KitchenDetails";
import OrderBilling from "./Customer/OrderBilling";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KitchenMenu from "./Kitchen/KitchenMenu";
import KitchenOrders from "./Kitchen/KitchenOrders";
import KitchenDashboard from "./Kitchen/KitchenDashboard";
import CustomerOrder from "./Customer/CustomerOrder";
import CustomerProfile from "./Customer/CustomerProfile";
import KitchenUserProfile from "./Kitchen/KitchenUserProfile";

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
          <KitchenMenu />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kitchen/menu",
      element: (
        <ProtectedRoute>
          <KitchenMenu />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kitchen/orders",
      element: (
        <ProtectedRoute>
          <KitchenOrders />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kitchen/dashboard",
      element: (
        <ProtectedRoute>
          <KitchenDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/kitchens",
      element: (
        <ProtectedRoute>
          <AllKitchens />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/orders",
      element: (
        <ProtectedRoute>
          <CustomerOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/profile",
      element: (
        <ProtectedRoute>
          <CustomerProfile />
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
      path: "/kitchen/profile",
      element: (
        <ProtectedRoute>
          <KitchenUserProfile />
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
    <React.Fragment>
      <RouterProvider router={appRouter} ></RouterProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </React.Fragment>
  );
};

export default Body;
