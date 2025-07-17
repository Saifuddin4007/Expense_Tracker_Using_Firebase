import React from 'react';
import { PiInvoiceBold } from "react-icons/pi";

const NullTransactions = () => {
  return (
    <div className='w-[600px] m-5 bg-gray-600 p-3 rounded h-[350px] flex flex-col justify-center items-center'>
        <PiInvoiceBold className='text-9xl text-center'/>
        <h2 className='font-bold text-2xl p-3 m-3'>No Transactions Found</h2>
          
    </div>
  )
}

export default NullTransactions