import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useEffect } from 'react';

const NavBar = () => {
    const location= useLocation();
    
    
  return (
    <>
        <nav className='flex justify-between items-center p-3 bg-blue-300'>
            <h1>Expense Tracker</h1>
            <ul className='flex justify-center items-center gap-7'>
                <li className={location.pathname==='/'?'focus:font-bold text-gray-700':''}>
                    <Link to={'/'}>&#128202;Dashboard</Link>
                </li>
                <li className={location.pathname==='/report'?'focus:font-bold text-gray-700':''}>
                    <Link to={'/report'}>&#128209;Report</Link>
                </li>
                <li className={location.pathname==='/transaction'?'focus:font-bold text-gray-700':''}>
                    <Link to={'/transaction'}>&#128220;Transaction</Link>
                </li>
                <li className={location.pathname==='/'?'focus:font-bold text-gray-700':''}>
                    <Link to={'/'}>&#128173;Get Quote</Link>
                </li>
                <li className={location.pathname==='/'?'focus:font-bold text-gray-700':''}>
                    <Link to={'/'}>&#128257;Reset All</Link>
                </li>
            </ul>
        </nav>

    </>
  )
}

export default NavBar