import React from 'react';

const CardTransaction = ({ transaction }) => {
    return (
        <ul>
            {transaction.slice(-5).reverse().map((val) => (
                <li key={val.id} className='text-m font-light flex flex-row justify-between bg-neutral-500 p-3 m-3 rounded-2xl'>
                    <span>{val.category}</span>
                    <span className={`${val.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                        ${val.amount}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default CardTransaction;
