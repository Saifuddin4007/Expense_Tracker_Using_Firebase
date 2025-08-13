// src/hooks/useResetTransactions.js
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";

export const useResetTransactions = () => {
    const { userId } = useGetUserInfo();

    const resetAllTransactions = async () => {
        const transactionCollectionRef = collection(db, "transactions");
        const q = query(transactionCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
            deleteDoc(doc(db, "transactions", docSnapshot.id))
        );

        await Promise.all(deletePromises);
    };

    return { resetAllTransactions };
};
