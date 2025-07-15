import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AddTransaction = () => {
    const [transactionType, setTransactionType] = useState("expense");
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const location = useLocation();
    const[transaction, setTransaction]= useState([]);
    const[edit,setEdit]= useState(null);
    
    const handleSubmit= (e) =>{
        e.preventDefault();
        if(!amount || !category || !date || !description){
            return;
        }
        
        const newTransactions = {
            transactionType,
            amount,
            category,
            description,
            date,
        }
        setDescription("");
        setAmount("");
        setDate("");
        setCategory("");

        
        let transactionArray;
        if(edit===null){
            transactionArray= [...transaction, newTransactions];
        }else{
            transactionArray=[...transaction];
            transactionArray[edit]=newTransactions;
        }
        
        localStorage.setItem("Transactions", JSON.stringify(transactionArray));
        
        
    }

    useEffect(() => {
      console.log(location.state);
        let storedTransactions= JSON.parse(localStorage.getItem("Transactions")) || [];
        setTransaction(storedTransactions);
      if(location.state && location.state.transaction){
        const{transaction}= location.state;
        setTransactionType(transaction.transactionType);
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setDescription(transaction.description);
        setDate(transaction.date);
        setEdit(transaction.ind);

      }
    }, [location])
    
    
    
    
  return (
    <form className='mt-15 p-5'>
        <div className='flex justify-center items-center flex-col gap-7'>
            <h1 className='bg-blue-300 font-bold text-2xl w-[500px] text-center rounded p-2 text-blue-50'>Add Transaction</h1>
            {/* Transaction type */}
            <div className='flex flex-col justify-center items-center gap-5  bg-gray-100 w-[500px] p-5 m-3 rounded-2xl'>
                <div className='flex flex-row gap-5'>
                    <label htmlFor="">
                        <input type="radio" value='expense' checked={transactionType==="expense"} onChange={()=>setTransactionType("expense")} /> Expense
                    </label>
                    <label htmlFor="">
                        <input type="radio" value='income' checked={transactionType==="income"} onChange={()=>setTransactionType("income")} /> Income
                    </label>
                </div>

                <input type="number" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} className='bg-gray-500 p-2 rounded w-[400px] border-0 outline-0' />

                <select value={category} onChange={(e)=>setCategory(e.target.value)} className='bg-gray-500 p-2 rounded w-[400px] border-0 outline-0'>
                    <option value="">Types</option>
                    <option value="market">Market</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    <option value="salary">Salary</option>
                    <option value="items">Items</option>
                    <option value="somethingelse">Something Else</option>
                </select>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' className='bg-gray-500 p-2 rounded w-[400px] h-[100px] border-0 outline-0'></textarea>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className='bg-gray-500 p-2 rounded w-[400px] border-0 outline-0'/>
                <button onClick={(e)=>handleSubmit(e)} className='bg-yellow-200 p-3 m-2 rounded w-[350px] border-0 outline-0'>{edit===null?'Add':'Update'}</button>
                
                
            </div>
        </div>
    </form>
  )
}

export default AddTransaction