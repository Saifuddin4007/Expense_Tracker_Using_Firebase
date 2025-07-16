import React from 'react';
import { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import CardTransaction from '../components/CardTransaction';
import { useNavigate } from 'react-router-dom';
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


const DashBoard = () => {

  const [transaction, setTransaction] = useState([])
  const [finalIncome, setFinalIncome] = useState(0)
  const [finalExpense, setFinalExpense] = useState(0)
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate();
  const [maxExpense, setMaxExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const categories = [
    "Salary",
    "Items",
    "Market",
    "Entertainment",
    "Shopping",
    "Something Else"
  ];
  const handleAddTransaction = () => {
    navigate('/add-transaction');
  }



  useEffect(() => {
    const currentTransaction = JSON.parse(localStorage.getItem("Transactions")) || [];
    setTransaction(currentTransaction);
    let income = 0;
    let expense = 0;
    let categoryBreakDown = {};
    let highestExp = 0;
    categories.forEach(cat => categoryBreakDown[cat] = 0)
    currentTransaction.forEach(val => {
      if (val.transactionType === 'income') {
        income += Number(val.amount);
      } else {
        expense += Number(val.amount);
        categoryBreakDown[val.category] = (categoryBreakDown[val.category] || 0) + Number(val.amount);
        if (categoryBreakDown[val.category] > highestExp) {
          highestExp = categoryBreakDown[val.category];
        }
      }
    });
    setFinalIncome(income);
    setFinalExpense(expense);
    setBalance(income - expense);
    setCategoryData(categoryBreakDown);
    setMaxExpense(highestExp);

  }, []);



  const chartData = useMemo(() => ({
    labels: categories,
    datasets: [
      {
        label: "Expenses As Per Category",
        data: categories.map(cate => categoryData[cate] || 0),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9966FF',
          '#FFA07A',
        ],
      },
    ],
  }), [categoryData]);



  const chartOptions = useMemo(() => ({
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
        grid: { display: false },
        ticks: {
          stepSize: maxExpense > 0 ? Math.ceil(maxExpense / 5) : 2, autoSkip: false,
          maxRotation: 0,
          padding: 10
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          autoSkip: false, // force all labels to show
          maxRotation: 0, // horizontal labels
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }), [maxExpense]);





  return (
    <>
      <div className='flex flex-row justify-between m-4'>
        <h3 className='font-bold text-2xl p-2 m-2'>Dashboard</h3>
        <button className='bg-emerald-400 text-center w-[150px] rounded-2xl cursor-pointer' onClick={handleAddTransaction}>+Add Transaction</button>
      </div>
      <Cards finalIncome={finalIncome} finalExpense={finalExpense} balance={balance} />

      <div className='flex flex-row'>
        <div className='w-1/2 m-5 bg-gray-400 p-3 rounded h-[500px]'>
          <h1 className='font-bold text-2xl p-3 m-3'>Recent Transaction</h1>
          <CardTransaction transaction={transaction} />
        </div>
        <div className='w-1/2 m-5 bg-gray-400 p-3 rounded h-[500px] overflow-x-auto'>
          <h1 className='font-bold text-2xl p-3 m-3'>Expense By Category</h1>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  )
}

export default DashBoard