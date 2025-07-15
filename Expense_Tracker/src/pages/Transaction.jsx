import React from 'react'
import { useState, useEffect } from 'react';
import AddTransaction from './AddTransaction';
import {useNavigate} from 'react-router-dom';

const Transaction = () => {
const navigate = useNavigate();
const [transaction, setTransaction] = useState([])
  

  const handleEdit = (ind) =>{
    const editTransac= transaction[ind];
    navigate('/add-transaction', {state: {transaction: {...editTransac, ind}}})
  }


  const handleDelete = (ind) =>{
    const updateTransac= transaction.filter((val,i)=>i!==ind);
    setTransaction(updateTransac);
    localStorage.setItem('Transactions', JSON.stringify(updateTransac));
  }
  useEffect(() => {
    let storedTransactions= JSON.parse(localStorage.getItem("Transactions")) || [];
    setTransaction(storedTransactions);
    
  }, [])
  


  return (
    <>
        {/* <AddTransaction /> */}
        {/* <div className='w-full h-1.5 bg-gray-300'></div> */}

        <h1 className='text-center text-3xl text-teal-400 m-3'>Transactions</h1>
        <table className='table-auto border border-gray-400 w-full text-center'>
          <thead>
            <th>Ind</th>
            <th className='border border-gray-400 px-4 py-2'>Categoory</th>
            <th className='border border-gray-400 px-4 py-2'>Amount</th>
            <th className='border border-gray-400 px-4 py-2'>Date</th>
            <th className='border border-gray-400 px-4 py-2'>Description</th>
            <th className='border border-gray-400 px-4 py-2'>Transaction Type</th>
            <th className='border border-gray-400 px-4 py-2'>Action</th>
            
          </thead>

          <tbody>
            
              {
              transaction.map((val,ind)=>(
                <tr key={ind} className='bg-gray-100'>
                  <td className='border border-gray-400 px-4 py-2'>{ind}</td>
                  <td className='border border-gray-400 px-4 py-2'>{val.category}</td>
                  <td className={`border border-gray-400 px-4 py-2 ${val.transactionType==='expense'?'text-red-400':'text-green-400'}`}>{val.amount}</td>
                  <td className='border border-gray-400 px-4 py-2'>{val.date}</td>
                  <td className='border border-gray-400 px-4 py-2'>{val.description}</td>
                  <td className='border border-gray-400 px-4 py-2'>{val.transactionType}</td>
                  <td className='border border-gray-400 px-4 py-2'>
                    <button className='p-2.5 bg-green-300 border-0 outline-0 m-1.5 w-[100px] rounded-3xl cursor-pointer' onClick={()=>handleEdit(ind)}>Edit</button>
                    <button className='p-2.5 bg-red-300 border-0 outline-0 m-1.5 w-[100px] rounded-3xl cursor-pointer' onClick={()=>handleDelete(ind)}>Delete</button>
                    </td>
                </tr>
                
              ))
              }
            
          </tbody>
        </table>

    </>
  )
}

export default Transaction