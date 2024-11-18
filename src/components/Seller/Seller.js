import React, { useEffect } from 'react'
import SellerDetailsForm from './SellerDetailsForm';
import useKitchen from '../../hooks/useKitchen';
import { useSelector } from 'react-redux';
import KitchenLayout from '../Kitchen/KitchenLayout';

const Seller = () => {

  // useKitchen();

  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  useEffect(() => {
    // if (kitchen == null)
    //   setTimeout(() => {
    //     document.getElementById("my_modal_1")?.showModal();
    //   }, 500);
  }, [])

  return (
    <KitchenLayout>
      {kitchen ? <div className="w-full">hellooooo</div> : <SellerDetailsForm />}
    </KitchenLayout>
  )
}

export default Seller
