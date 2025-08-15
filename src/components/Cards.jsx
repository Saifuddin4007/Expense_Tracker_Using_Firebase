import React from 'react';

const Cards = ({ finalIncome = 0, finalExpense = 0, totalBalance = 0 }) => {
    return (
        <>
            <div className='w-full md:w-full bg-gray-300 p-3 my-3 flex flex-col mx-0 md:mx-0 rounded'>
                <h5 className='p-2 m-1.5 font-light text-sm'>Current Balance</h5>
                <h1 className='p-2 m-1.5 font-bold text-2xl'>
                    ${totalBalance >= 0 ? totalBalance.toFixed(2) : `-${Math.abs(totalBalance).toFixed(2)}`}
                </h1>
            </div>

            <div className='flex flex-col md:flex-row w-full'>
                <div className='md:w-1/2 m-2 bg-gray-400 p-3 rounded'>
                    <h5 className='text-sm font-light p-2 m-1.5'>Total Income</h5>
                    <h5 className='text-2xl font-bold p-2 m-1.5 text-green-600'>${finalIncome.toFixed(2)}</h5>
                </div>

                <div className='md:w-1/2 m-2 bg-gray-400 p-3 rounded'>
                    <h5 className='text-sm font-light p-2 m-1.5'>Total Expense</h5>
                    <h5 className='text-2xl font-bold p-2 m-1.5 text-red-600'>${finalExpense.toFixed(2)}</h5>
                </div>
            </div>
        </>
    );
};

export default Cards;
