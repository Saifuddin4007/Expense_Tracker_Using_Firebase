import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useResetTransactions } from '../hooks/useResetTransactions';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetAllTransactions } = useResetTransactions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResetAll = async () => {
    try {
      await resetAllTransactions();
      navigate('/dashboard');
      setIsMenuOpen(false); // close menu after action
    } catch (error) {
      console.error('Failed to reset all transactions:', error);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center p-3 bg-blue-300 relative">
        {/* Logo */}
        <h1
          className="font-bold text-2xl"
          style={{ fontFamily: 'Kaushan Script, cursive' }}
        >
          Expense Tracker
        </h1>

        {/* Hamburger button (mobile/tablet) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-gray-600 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-5 h-[2px] bg-black mb-[3px]"></span>
          <span className="block w-5 h-[2px] bg-black mb-[3px]"></span>
          <span className="block w-5 h-[2px] bg-black"></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-7">
          <li
            className={
              location.pathname === '/dashboard'
                ? 'font-bold text-gray-700'
                : ''
            }
          >
            <Link to={'/dashboard'}>&#128202;Dashboard</Link>
          </li>
          <li
            className={
              location.pathname === '/report' ? 'font-bold text-gray-700' : ''
            }
          >
            <Link to={'/report'}>&#128209;Report</Link>
          </li>
          <li
            className={
              location.pathname === '/transaction'
                ? 'font-bold text-gray-700'
                : ''
            }
          >
            <Link to={'/transaction'}>&#128220;Transaction</Link>
          </li>
          <li>
            <button
              className="cursor-pointer"
              onClick={handleResetAll}
            >
              &#128257;Reset All
            </button>
          </li>
        </ul>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-300 shadow-lg md:hidden z-50">
            <ul className="flex flex-col gap-4 p-4">
              <li
                className={
                  location.pathname === '/dashboard'
                    ? 'font-bold text-gray-700'
                    : ''
                }
              >
                <Link
                  to={'/dashboard'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  &#128202;Dashboard
                </Link>
              </li>
              <li
                className={
                  location.pathname === '/report'
                    ? 'font-bold text-gray-700'
                    : ''
                }
              >
                <Link
                  to={'/report'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  &#128209;Report
                </Link>
              </li>
              <li
                className={
                  location.pathname === '/transaction'
                    ? 'font-bold text-gray-700'
                    : ''
                }
              >
                <Link
                  to={'/transaction'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  &#128220;Transaction
                </Link>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={handleResetAll}
                >
                  &#128257;Reset All
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
