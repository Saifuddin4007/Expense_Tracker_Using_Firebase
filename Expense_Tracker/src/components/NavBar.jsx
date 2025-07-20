import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useResetTransactions} from '../hooks/useResetTransactions';

const NavBar = () => {
    const location = useLocation();
    const navigate= useNavigate();
    const {resetAllTransactions}= useResetTransactions();


    const handleResetAll = async () => {
        try {
            await resetAllTransactions();
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to reset all transactions:', error);
        }
    };

    return (
        <>
            <nav className='flex justify-between items-center p-3 bg-blue-300'>
                <h1 className='font-bold text-2xl' style={{ fontFamily: 'Kaushan Script, cursive' }}>Expense Tracker</h1>
                <ul className='flex justify-center items-center gap-7'>
                    <li className={location.pathname === '/' ? 'focus:font-bold text-gray-700' : ''}>
                        <Link to={'/dashboard'}>&#128202;Dashboard</Link>
                    </li>
                    <li className={location.pathname === '/report' ? 'focus:font-bold text-gray-700' : ''}>
                        <Link to={'/report'}>&#128209;Report</Link>
                    </li>
                    <li className={location.pathname === '/transaction' ? 'focus:font-bold text-gray-700' : ''}>
                        <Link to={'/transaction'}>&#128220;Transaction</Link>
                    </li>
                    <li className={location.pathname === '/' ? 'focus:font-bold text-gray-700' : ''}>
                        <button className='cursor-pointer' onClick={handleResetAll}>&#128257;Reset All</button>
                        
                    </li>
                </ul>

                
            </nav>

        </>
    )
}

export default NavBar