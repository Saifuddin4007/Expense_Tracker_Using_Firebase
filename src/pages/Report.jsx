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
    <div className="flex flex-col items-center justify-center w-full px-4">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">Expense Report</h2>

      {/* Month Selector */}
      <div className="flex flex-col justify-center items-center mt-4 w-full max-w-sm sm:max-w-md">
        <label className="text-sm font-bold mb-1">Select Month</label>
        <div className="flex flex-row justify-between items-center w-full border-2 rounded p-1 m-1 cursor-pointer">
          <input
            ref={inputRef}
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="cursor-pointer w-full max-w-[85%]"
          />
          <SlCalender
            onClick={() => inputRef.current?.focus()}
            className="cursor-pointer flex-shrink-0"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 p-2 m-2 w-full max-w-4xl">
        <div className="w-full sm:w-[300px] bg-gray-500 h-[100px] rounded flex flex-col justify-center">
          <p className="px-3 font-bold text-sm">Total Income</p>
          <h3 className="px-3 font-bold text-sm text-green-500">{totalIncome.toLocaleString()}</h3>
        </div>
        <div className="w-full sm:w-[300px] bg-gray-500 h-[100px] rounded flex flex-col justify-center">
          <p className="px-3 font-bold text-sm">Total Expense</p>
          <h3 className="px-3 font-bold text-sm text-red-600">{totalExpense.toLocaleString()}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row justify-center items-center mt-8 gap-10 w-full max-w-7xl">
        {/* Pie Chart */}
        <div className="flex flex-col justify-center items-center w-full max-w-sm md:max-w-md lg:max-w-lg h-[400px] md:h-[500px]">
          <h3 className="p-2 font-bold text-lg sm:text-xl md:text-2xl">Category Wise Expense</h3>
          <div className="w-full h-full">
            {Object.keys(categoryData).length === 0 ? (
              <NullTransactions />
            ) : (
              <Pie data={pieChartData} />
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex flex-col justify-center items-center w-full max-w-sm md:max-w-md lg:max-w-lg h-[400px] md:h-[500px]">
          <h3 className="p-2 font-bold text-lg sm:text-xl md:text-2xl">Income VS Expense</h3>
          <div className="w-full h-full">
            {totalIncome === 0 && totalExpense === 0 ? (
              <NullTransactions />
            ) : (
              <Bar data={barChartData} options={chartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
