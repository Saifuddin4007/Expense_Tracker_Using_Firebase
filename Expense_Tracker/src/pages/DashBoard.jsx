import React from 'react';
import { useState, useEffect } from 'react';
import Cards from '../components/Cards'

const DashBoard = () => {

  const [transaction, setTransaction] = useState([])
    const [finalIncome, setFinalIncome] = useState(0)
    const [finalExpense, setFinalExpense] = useState(0)
    const [balance, setBalance] = useState(0)


    useEffect(() => {
      const currentTransaction = JSON.parse(localStorage.getItem("Transactions")) || [];
      setTransaction(currentTransaction);
      let income=0;
      let expense=0;

      currentTransaction.forEach(val => {
        if(val.transactionType==='income'){
            income+=Number(val.amount);
        }else{
            expense+=Number(val.amount);
        }
      });
      setFinalIncome(income);
      setFinalExpense(expense);
      setBalance(income-expense);

    }, []);




  return (
    <>
      <div className='flex flex-row justify-between m-4'>
        <h3 className='font-bold text-2xl p-2 m-2'>Dashboard</h3>
        <button className='bg-emerald-400 text-center w-[150px] rounded-2xl'>+Add Transaction</button>
      </div>
      <Cards finalIncome={finalIncome} finalExpense={finalExpense} balance={balance} />
    </>
  )
}

export default DashBoard