import React from 'react';

const CardTransaction = ({ transaction }) => {
    return (
        <ul className="w-full max-w-[600px] mx-auto px-2 sm:px-4">
            {transaction.slice(-5).reverse().map((val) => (
                <li 
                    key={val.id} 
                    className="text-sm sm:text-base font-light flex flex-col sm:flex-row sm:justify-between bg-neutral-500 p-2 sm:p-3 m-2 sm:m-3 rounded-2xl break-words"
                >
                    <span className="mb-1 sm:mb-0">{val.category}</span>
                    <span 
                        className={`${val.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'} text-sm sm:text-base`}
                    >
                        ${val.amount}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default CardTransaction;
