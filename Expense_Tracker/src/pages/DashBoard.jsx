import React from 'react';
import { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import CardTransaction from '../components/CardTransaction';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const [transaction, setTransaction] = useState([])
    const [finalIncome, setFinalIncome] = useState(0)
    const [finalExpense, setFinalExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate();


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

    const handleAddTransaction = () =>{
        navigate('/add-transaction');
    }



  return (
    <>
      <div className='flex flex-row justify-between m-4'>
        <h3 className='font-bold text-2xl p-2 m-2'>Dashboard</h3>
        <button className='bg-emerald-400 text-center w-[150px] rounded-2xl cursor-pointer' onClick={handleAddTransaction}>+Add Transaction</button>
      </div>
      <Cards finalIncome={finalIncome} finalExpense={finalExpense} balance={balance} />

      <div className='flex flex-row'>
        <div className='w-1/2 m-5 bg-gray-400 p-3 rounded'>
          <h1 className='font-bold text-2xl p-3 m-3'>Recent Transaction</h1>
          <CardTransaction transaction={transaction} />
        </div>
        <div className='w-1/2 m-5 bg-gray-400 p-3 rounded'>

        </div>
      </div>
    </>
  )
}

export default DashBoard