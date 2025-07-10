import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import {useGetUserInfo} from './useGetUserInfo';

export const useAddTransaction = () =>{
    const transactionCollectionRefer= collection(db, 'transactions');
    const {userID} = useGetUserInfo();
    const addTransaction = async ({description, transactionAmount, transactionType}) =>{
        await addDoc(transactionCollectionRefer, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    }

    console.log(userID);

    return {addTransaction}
}