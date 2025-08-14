import React from 'react';
import { PiInvoiceBold } from "react-icons/pi";

const NullTransactions = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto m-3 sm:m-5 bg-gray-600 p-4 sm:p-3 rounded h-[250px] sm:h-[350px] flex flex-col justify-center items-center">
      <PiInvoiceBold className="text-6xl sm:text-9xl text-center" />
      <h2 className="font-bold text-lg sm:text-2xl p-2 sm:p-3 m-2 sm:m-3 text-center">
        No Transactions Found
      </h2>
    </div>
  );
};

export default NullTransactions;
