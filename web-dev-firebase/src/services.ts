import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";

interface createUserProps {
    name: string,
    email: string,
    password: string
}

export const createUser = async ({name, email, password}: createUserProps) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name,
            email,
            password,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
