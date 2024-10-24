import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./Login";
import Seller from "./Seller";
import Customer from "./Customer";


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/kitchen",
      element: <Seller />,
    },
    {
        path: "/customer",
        element: <Customer />,
      },
  ]);


  return (
    <div>
      <RouterProvider router={appRouter} ></RouterProvider>
    </div>
  );
};

export default Body;
