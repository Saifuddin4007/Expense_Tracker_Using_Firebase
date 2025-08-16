import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';
import CardTransaction from '../components/CardTransaction';
import { Bar } from "react-chartjs-2";
import { useGetTransactions } from '../hooks/useGetTransactions';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import NullTransactions from '../components/NullTransactions';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categories = ["Salary", "Items", "Market", "Entertainment", "Shopping", "Something Else"];

const DashBoard = () => {
    const navigate = useNavigate();
    const { transactions, transactionTotals } = useGetTransactions();
    const { balance, income, expense } = transactionTotals;

    const categoryBreakDown = {};
    categories.forEach(cat => categoryBreakDown[cat] = 0);

    transactions.forEach(val => {
        if (val.transactionType === 'expense') {
            categoryBreakDown[val.category] = (categoryBreakDown[val.category] || 0) + Number(val.amount);
        }
    });

    const maxExpense = Math.max(...Object.values(categoryBreakDown));

    const chartData = {
        labels: categories,
        datasets: [{
            label: "Expenses As Per Category",
            data: categories.map(cate => categoryBreakDown[cate] || 0),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF', '#FFA07A'],
        }],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
                grid: { display: false },
                ticks: {
                    stepSize: maxExpense > 0 ? Math.ceil(maxExpense / 5) : 2,
                    autoSkip: false,
                    maxRotation: 0,
                    padding: 10
                },
            },
            x: {
                grid: { display: false },
                ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 },
            },
        },
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            {/* Header */}
            <div className='flex flex-col sm:flex-row justify-between m-4 gap-3 sm:gap-0'>
                <h3 className='font-bold text-xl sm:text-2xl p-2 m-0'>Dashboard</h3>
                <button
                    className='bg-[#A4DEF9] text-center w-full sm:w-[150px] rounded-2xl cursor-pointer py-2 sm:py-0'
                    onClick={() => navigate('/add-transaction')}
                >
                    + Add Transaction
                </button>
            </div>

            {/* Cards */}
             <Cards finalIncome={income} finalExpense={expense} totalBalance={balance} />



            {/* Two-column layout for desktop, stacked for mobile */}
            <div className='flex flex-col lg:flex-row'>
                {/* Left panel */}
                <div className='w-full lg:w-1/2 m-3 bg-[#C1E0F7] p-3 rounded h-auto lg:h-[500px]'>
                    <h1 className='font-bold text-xl sm:text-2xl p-3'>Recent Transaction</h1>
                    {transactions.length === 0
                        ? <NullTransactions />
                        : <CardTransaction transaction={transactions} />}
                </div>

                {/* Right panel */}
<div className='w-full lg:w-1/2 m-3 bg-[#C1E0F7] p-3 rounded h-auto lg:h-[500px] lg:overflow-y-auto'>
    <h1 className='font-bold text-xl sm:text-2xl p-3'>Expense By Category</h1>
    {chartData.datasets[0].data.every(val => val === 0)
        ? <NullTransactions />
        : (
            <div className='h-[300px] lg:h-auto lg:min-h-[400px]'>
                <Bar data={chartData} options={chartOptions} />
            </div>
        )}
</div>

            </div>
        </>
    );
};

export default DashBoard;
