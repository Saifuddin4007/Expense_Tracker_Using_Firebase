import {addDoc, collection, doc, updateDoc} from 'firebase/firestore';
import {db} from '../config/FirebaseConfig';
import {useGetUserInfo} from '../hooks/useGetUserInfo';

export const useAddTransaction = () =>{
    const transactionCollectionRefer= collection(db, 'transactions');
    const {userId}= useGetUserInfo();
    const addTransaction = async ({transactionType, amount, category, description, date}) =>{
        await addDoc(transactionCollectionRefer, {
            userId,
            transactionType,
            amount,
            category,
            description,
            date,
        });
    };

    const updateTransaction = async (id, { transactionType, amount, category, description, date }) => {
        const transactionDoc = doc(db, 'transactions', id);
        await updateDoc(transactionDoc, {
            transactionType,
            amount,
            category,
            description,
            date,
        });
    };

    

    return {addTransaction, updateTransaction}
}

