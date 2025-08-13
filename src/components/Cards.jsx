import React from 'react';

const Cards = ({ finalIncome = 0, finalExpense = 0, totalBalance = 0 }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Current Balance */}
            <div className="w-full bg-gray-300 p-3 sm:p-4 my-2 flex flex-col rounded-lg mx-auto max-w-md sm:max-w-xl">
                <h5 className="p-1 sm:p-2 font-light text-sm sm:text-base">Current Balance</h5>
                <h1 className="p-1 sm:p-2 font-bold text-xl sm:text-2xl break-words">
                    ${totalBalance >= 0
                        ? totalBalance.toFixed(2)
                        : `-${Math.abs(totalBalance).toFixed(2)}`}
                </h1>
            </div>

            {/* Income & Expense */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
                <div className="flex-1 bg-gray-400 p-3 sm:p-4 rounded-lg">
                    <h5 className="text-sm sm:text-base font-light p-1 sm:p-2">Total Income</h5>
                    <h5 className="text-xl sm:text-2xl font-bold p-1 sm:p-2 text-green-600 break-words">
                        ${finalIncome.toFixed(2)}
                    </h5>
                </div>

                <div className="flex-1 bg-gray-400 p-3 sm:p-4 rounded-lg">
                    <h5 className="text-sm sm:text-base font-light p-1 sm:p-2">Total Expense</h5>
                    <h5 className="text-xl sm:text-2xl font-bold p-1 sm:p-2 text-red-600 break-words">
                        ${finalExpense.toFixed(2)}
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Cards;
