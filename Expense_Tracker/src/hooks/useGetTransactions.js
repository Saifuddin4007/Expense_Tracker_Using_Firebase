import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import {useGetUserInfo} from './useGetUserInfo';
import {db} from '../config/firebaseConfig';



export const useGetTransactions = () =>{
    const [transactions, setTransactions] = useState([])
    const transactionCollectionRefer= collection (db, 'transactions')
    const {userID} = useGetUserInfo();
    const [transactionTotals, setTransactionTotals] = useState({
        balance:0,
        income:0,
        expense:0,
    });


    const getTransactions = async () =>{
        let unsubscribe;
        try{

            const queryTransaction= query(transactionCollectionRefer, 
                where('userID', '==', userID),
                orderBy('createdAt')
            );
            
            unsubscribe = onSnapshot(queryTransaction, (snapshot)=>{
                let docs = [];

                let totalIncome=0;
                let totalExpense=0;
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    const id= doc.id;

                    docs.push({...data, id})

                    if(data.transactionType==='expense'){
                        totalExpense+=Number(data.transactionAmount);
                    }
                    else{
                        totalIncome+=Number(data.transactionAmount);
                    }
                })

                setTransactions(docs)
                let balance= totalIncome-totalExpense;
                setTransactionTotals({
                    balance,
                    income: totalIncome,
                    expense: totalExpense,
                })

            })

        }catch(err){
            console.log(err);
        }

        return ()=> unsubscribe()
    }

    useEffect(() => {
        
        getTransactions()
    
    }, [])
    

    return {transactions, transactionTotals}
}