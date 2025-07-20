import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useAddTransaction} from '../hooks/useAddTransaction';


const AddTransaction = () => {
    const [transactionType, setTransactionType] = useState("expense");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const location = useLocation();
    const[transaction, setTransaction]= useState([]);
    const[editId,setEditId]= useState(null);
    const navigate = useNavigate();
    const {addTransaction, updateTransaction}= useAddTransaction();
    


    useEffect(() => {
        if (location.state && location.state.transaction) {
            const transaction = location.state.transaction;
            setTransactionType(transaction.transactionType);
            setAmount(transaction.amount);
            setCategory(transaction.category);
            setDescription(transaction.description);
            setDate(transaction.date);
            setEditId(transaction.id);
        }
    }, [location]);
    
    const handleSubmit= async (e) =>{
        e.preventDefault();
        if(!amount || !category || !date || !description){
            return;
        }

        if (editId) {
            await updateTransaction(editId, {
                transactionType,
                amount,
                category,
                description,
                date,
            });
        } else {
            await addTransaction({
                transactionType,
                amount,
                category,
                description,
                date,
            });
        }
        

        setDescription("");
        setAmount();
        setDate("");
        setCategory("");
        
        navigate('/transaction');
        
    }
  
    
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
                    <option value="Market">Market</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Salary">Salary</option>
                    <option value="Items">Items</option>
                    <option value="Something Else">Something Else</option>
                </select>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' className='bg-gray-500 p-2 rounded w-[400px] h-[100px] border-0 outline-0'></textarea>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className='bg-gray-500 p-2 rounded w-[400px] border-0 outline-0'/>
                <button onClick={(e)=>handleSubmit(e)} className='bg-yellow-200 p-3 m-2 rounded w-[350px] border-0 outline-0'>{editId===null?'Add':'Update'}</button>
                
                
            </div>
        </div>
    </form>
  )
}

export default AddTransaction



