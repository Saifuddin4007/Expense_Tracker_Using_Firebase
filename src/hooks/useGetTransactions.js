import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useGetUserInfo } from './useGetUserInfo';
import { db } from '../config/FirebaseConfig';

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });
    const { userId } = useGetUserInfo();

    useEffect(() => {
        if (!userId) return;

        const transactionCollectionRef = collection(db, 'transactions');
        const queryTransaction = query(
            transactionCollectionRef,
            where('userId', '==', userId),
            orderBy('date')
        );

        const unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
            let docs = [];
            let totalIncome = 0;
            let totalExpense = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                docs.push({ ...data, id });

                if (data.transactionType === 'expense') {
                    totalExpense += Number(data.amount);
                } else {
                    totalIncome += Number(data.amount);
                }
            });

            const balance = totalIncome - totalExpense;
            setTransactions(docs);
            setTransactionTotals({
                balance,
                income: totalIncome,
                expense: totalExpense,
            });
        });

        return () => unsubscribe();
    }, [userId]);

    return { transactions, transactionTotals };
};
