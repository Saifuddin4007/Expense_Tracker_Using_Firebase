import React from 'react';
import { useNavigate } from 'react-router-dom';
import NullTransactions from '../components/NullTransactions';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

const Transaction = () => {
  const navigate = useNavigate();
  const { transactions } = useGetTransactions();

  const handleEdit = (transaction) => {
    navigate('/add-transaction', { state: { transaction } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <>
      {transactions.length === 0 ? (
        <div className="flex justify-center items-center">
          <NullTransactions />
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl sm:text-3xl text-teal-400 m-3">
            Transactions
          </h1>
          <div className="overflow-x-auto w-full">
            <table className="table-auto border border-gray-400 w-full text-center min-w-[600px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 sm:px-4 sm:py-2">Ind</th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Category
                  </th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Amount
                  </th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Date
                  </th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Description
                  </th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Transaction Type
                  </th>
                  <th className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((val, ind) => (
                  <tr key={val.id} className="bg-gray-100 text-sm sm:text-base">
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                      {ind + 1}
                    </td>
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                      {val.category}
                    </td>
                    <td
                      className={`border border-gray-400 px-2 py-1 sm:px-4 sm:py-2 ${
                        val.transactionType === 'expense'
                          ? 'text-red-400'
                          : 'text-green-400'
                      }`}
                    >
                      {val.amount}
                    </td>
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                      {val.date}
                    </td>
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                      {val.description}
                    </td>
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2">
                      {val.transactionType}
                    </td>
                    <td className="border border-gray-400 px-2 py-1 sm:px-4 sm:py-2 flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        className="p-2 bg-green-300 rounded-3xl cursor-pointer text-xs sm:text-sm md:w-[100px]"
                        onClick={() => handleEdit(val)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 bg-red-300 rounded-3xl cursor-pointer text-xs sm:text-sm md:w-[100px]"
                        onClick={() => handleDelete(val.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Transaction;
