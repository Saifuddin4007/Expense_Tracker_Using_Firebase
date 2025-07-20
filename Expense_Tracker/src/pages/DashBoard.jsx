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
            <div className='flex flex-row justify-between m-4'>
                <h3 className='font-bold text-2xl p-2 m-2'>Dashboard</h3>
                <button className='bg-emerald-400 text-center w-[150px] rounded-2xl cursor-pointer' onClick={() => navigate('/add-transaction')}>
                    +Add Transaction
                </button>
            </div>
            <Cards finalIncome={income} finalExpense={expense} totalBalance={balance} />
            <div className='flex flex-row'>
                <div className='w-1/2 m-5 bg-gray-400 p-3 rounded h-[500px]'>
                    <h1 className='font-bold text-2xl p-3 m-3'>Recent Transaction</h1>
                    {transactions.length === 0 ? <NullTransactions /> : <CardTransaction transaction={transactions} />}
                </div>
                <div className='w-1/2 m-5 bg-gray-400 p-3 rounded h-[500px] overflow-x-auto'>
                    <h1 className='font-bold text-2xl p-3 m-3'>Expense By Category</h1>
                    {chartData.datasets[0].data.every(val => val === 0) ? <NullTransactions /> : <Bar data={chartData} options={chartOptions} />}
                </div>
            </div>
        </>
    );
};

export default DashBoard;
