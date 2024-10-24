import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import useKitchenList from "../hooks/useKitchenList";
import KitchenList from "./Customer/KitchenList";

const Customer = () => {
  useKitchenList();
  const kitchenList = useSelector((store) => store.kitchen.kitchenList);
  const user = useSelector(store=>store.user);
  return (
    <div>
      <Header />
      <div  className="absolute mt-32" >
        <div className=" mt-0 pl-4 md:pl-20">
          {/* <p className="font-bold text-xl">Welcome {user.email}</p> */}
          <KitchenList title={"Trending Kitchen"} kitchenList={kitchenList} />
          <div className="mt-12"></div>
          <KitchenList title={"Nearby Kitchen"} kitchenList={kitchenList} />
          <div className="mt-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
