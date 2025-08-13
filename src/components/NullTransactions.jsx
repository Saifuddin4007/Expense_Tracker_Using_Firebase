import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";

const NullTransactions = () => {
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl m-3 sm:m-5 bg-gray-600 p-3 sm:p-4 rounded-lg h-[250px] sm:h-[300px] md:h-[350px] flex flex-col justify-center items-center text-center overflow-hidden">
      <FaFileInvoiceDollar className="text-6xl sm:text-8xl md:text-9xl text-center mb-2 sm:mb-3" />
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl px-2 sm:px-3 break-words">
        No Transactions Found
      </h2>
    </div>
  );
};

export default NullTransactions;
