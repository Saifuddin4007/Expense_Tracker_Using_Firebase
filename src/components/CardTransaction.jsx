import React from 'react';

const CardTransaction = ({ transaction }) => {
    return (
        <ul className="w-full">
            {transaction.slice(-5).reverse().map((val) => (
                <li
                    key={val.id}
                    className="text-sm sm:text-base lg:text-lg font-light flex justify-between items-center bg-neutral-500 p-2 sm:p-3 lg:p-4 my-2 sm:my-3 rounded-2xl break-words"
                >
                    {/* Category */}
                    <span className="truncate max-w-[60%]">{val.category}</span>

                    {/* Amount */}
                    <span
                        className={`${
                            val.transactionType === 'expense'
                                ? 'text-red-500'
                                : 'text-green-500'
                        } font-medium`}
                    >
                        ${val.amount}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default CardTransaction;
