import { sendPasswordResetEmail } from "firebase/auth"

export const firestoreUpdateDocument = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { data: true};
    } catch (error) {
        const firebaseError = error as FirebaseError;
        //
        return{
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};