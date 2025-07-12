import React from 'react';


const Cards = ({finalIncome, finalExpense, balance}) => {
    
  return (
    <>
        <div className='w-max-w-xl bg-gray-300 p-3 my-3 flex flex-col mx-5 rounded'>
            <h5 className='p-2 m-1.5 font-light text-sm'>Current Balance</h5>
            <h1 className='p-2 m-1.5 font-bold text-2xl '>${balance}</h1>
        </div>
        <div className='flex flex-row'>
            <div className='w-1/2 m-5 bg-gray-400 p-3 rounded'>
                <h5 className='text-sm font-light p-2 m-1.5'>Total Income</h5>
                <h5 className='text-2xl font-bold p-2 m-1.5 text-green-600'>${finalIncome}</h5>
            </div>
            <div className='w-1/2 m-5 bg-gray-400 p-3 rounded'>
                <h5 className='text-sm font-light p-2 m-1.5'>Total Expense</h5>
                <h5 className='text-2xl font-bold p-2 m-1.5 text-red-600'>${finalExpense}</h5>
            </div>
        </div>
    </>
  )
}

export default Cards