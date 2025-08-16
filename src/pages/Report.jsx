import React, { useEffect, useState, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import NullTransactions from '../components/NullTransactions';
import { SlCalender } from "react-icons/sl";
import { useGetTransactions } from '../hooks/useGetTransactions';

ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Report = () => {
  const { transactions } = useGetTransactions();

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterTransactions, setFilterTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (!transactions.length) return;

    const filtered = transactions.filter((val) =>
      val.date?.startsWith(selectedMonth)
    );

    setFilterTransactions(filtered);

    let income = 0;
    let expense = 0;
    let categoryBreakDown = {};

    filtered.forEach(element => {
      if (element.transactionType === 'income') {
        income += Number(element.amount);
      } else {
        expense += Number(element.amount);
        categoryBreakDown[element.category] = (categoryBreakDown[element.category] || 0) + Number(element.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setCategoryData(categoryBreakDown);
  }, [transactions, selectedMonth]);

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF'],
      },
    ],
  };

  const barChartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='flex flex-col items-center justify-center h-full px-4 sm:px-8'>
      <h2 className='font-bold text-2xl sm:text-4xl text-center'>Expense Report</h2>

      <div className='flex flex-col justify-center items-center w-full max-w-lg'>
        <label className='text-sm font-bold mt-4'>Select Month</label>
        <div className='flex flex-row justify-between items-center w-full border-2 rounded p-2 m-2 cursor-pointer'>
          <input
            ref={inputRef}
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className='cursor-pointer w-full outline-none bg-transparent'
          />
          <SlCalender
            onClick={() => inputRef.current?.focus()}
            className='cursor-pointer ml-2'
          />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 p-2 m-2 w-full max-w-4xl'>
        <div className='w-full sm:w-[300px] bg-[#C1E0F7] h-[100px] rounded'>
          <p className='p-2 font-bold text-sm'>Total Income</p>
          <h3 className='p-2 font-bold text-sm text-green-500'>{totalIncome.toLocaleString()}</h3>
        </div>
        <div className='w-full sm:w-[300px] bg-[#C1E0F7] h-[100px] rounded'>
          <p className='p-2 font-bold text-sm'>Total Expense</p>
          <h3 className='p-2 font-bold text-sm text-red-600'>{totalExpense.toLocaleString()}</h3>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center mt-8 gap-6 lg:gap-10 w-full max-w-6xl'>
        <div className='flex flex-col justify-center items-center h-auto lg:h-[600px] w-full lg:w-1/2'>
          <h3 className='p-2 font-bold text-xl sm:text-2xl text-center'>Category Wise Expense</h3>
          {Object.keys(categoryData).length === 0 ? (
            <NullTransactions />
          ) : (
            <div className='w-full max-w-sm sm:max-w-md'>
              <Pie data={pieChartData} />
            </div>
          )}
        </div>

        <div className='flex flex-col justify-center items-center h-auto lg:h-[600px] w-full lg:w-1/2'>
          <h3 className='p-2 font-bold text-xl sm:text-2xl text-center'>Income VS Expense</h3>
          {totalIncome === 0 && totalExpense === 0 ? (
            <NullTransactions />
          ) : (
            <div className='w-full max-w-sm sm:max-w-md'>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
