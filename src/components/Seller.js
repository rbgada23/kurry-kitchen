import React, { useEffect } from 'react'
import Header from "./Header";
import SellerDetailsForm from './Seller/SellerDetailsForm';
import useKitchen from '../hooks/useKitchen';
import { useSelector } from 'react-redux';
import KitchenLayout from './Kitchen/KitchenLayout';


const Seller = () => {

  useKitchen();
  
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);


  return (
    <div className="bg-slate-50">
      <Header />
      <div className="">
        {kitchen ? <KitchenLayout/> : <SellerDetailsForm/>}
      </div>
    </div>
  )
}

export default Seller
