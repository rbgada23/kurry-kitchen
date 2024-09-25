import React from 'react'
import Header from "./Header";
import AddMenu from './Seller/addMenu';


const Seller = () => {
  return (
    <div className='bg-[antiquewhite]'>
      <Header />
      <div className="mx-auto text-center">
        <AddMenu />
      </div>
    </div>
  )
}

export default Seller
