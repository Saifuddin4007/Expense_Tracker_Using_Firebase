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
            {/* Header + Add Button */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center m-2 sm:m-4 gap-3 sm:gap-0'>
                <h3 className='font-bold text-xl sm:text-2xl p-2 sm:p-0'>Dashboard</h3>
                <button
                    className='bg-emerald-400 text-center w-full sm:w-[150px] py-2 px-4 rounded-2xl cursor-pointer text-sm sm:text-base'
                    onClick={() => navigate('/add-transaction')}
                >
                    +Add Transaction
                </button>
            </div>

            {/* Cards Section */}
            <div className="px-2 sm:px-4">
                <Cards finalIncome={income} finalExpense={expense} totalBalance={balance} />
            </div>

            {/* Transactions & Chart */}
            <div className='flex flex-col lg:flex-row gap-4 px-2 sm:px-4 lg:px-6'>
                
                {/* Recent Transactions */}
                <div className='w-full lg:w-1/2 bg-gray-400 p-3 rounded-lg h-[400px] sm:h-[500px] overflow-hidden mt-2'>
                    <h1 className='font-bold text-lg sm:text-2xl mb-2'>Recent Transaction</h1>
                    <div className="h-[calc(100%-2rem)] overflow-y-auto pr-1">
                        {transactions.length === 0
                            ? <NullTransactions />
                            : <CardTransaction transaction={transactions} />}
                    </div>
                </div>

                {/* Expense Chart */}
                <div className='w-full lg:w-1/2 bg-gray-400 p-3 rounded-lg h-[400px] sm:h-[500px] overflow-hidden mt-2'>
                    <h1 className='font-bold text-lg sm:text-2xl mb-2'>Expense By Category</h1>
                    <div className="h-[calc(100%-2rem)]">
                        {chartData.datasets[0].data.every(val => val === 0)
                            ? <NullTransactions />
                            : <div className="w-full h-full"><Bar data={chartData} options={chartOptions} /></div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
