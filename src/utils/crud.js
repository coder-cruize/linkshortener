import { auth } from "../firebaseClient";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const dbActions = {
  signUp: async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') throw new Error('An account already exists with this Email')
    }
  },
  signIn: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error) {
      if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') throw new Error('Incorrect Email or Password')
      if(error.code === 'auth/too-many-requests') throw new Error('This account has been temporarily disabled. Try again later')
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error logging out");
    }
  }
}