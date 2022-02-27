import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseClient";

export const dbActions = {
  signUp: async (name, email, password) => {
    try {
      let userData = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(userData.user, {displayName: name})
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') throw new Error('Email already exists.')
    }
  },
  signIn: async (email, password) => {
    try {
      let userData = await signInWithEmailAndPassword(auth, email.trim(), password)
      console.log(userData.user.email)
    } catch (error) {
      throw new Error(error.message);
      // if(error.code === 'auth/email-already-in-use') throw new Error('Email already exists.')
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error logging out");
      // if(error.code === 'auth/email-already-in-use') throw new Error('Email already exists.')
    }
  }
}


// const dbActions = {
//   signUp: async (name, email, password) => {
//     try {
//       let userData = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userData.user, {displayName: name,})
//       toast("Welcome "+userData.user.displayName);
//     } catch (error) {
//       toast.error("MyError: " + error.message);
//     }
//   },
//   signIn: async (email, password) => {
//     try {
//       let userData = await signInWithEmailAndPassword(auth, email, password);
//       toast("Welcome back "+userData.user.displayName);
//     } catch (error) {
//       toast.error("MyError: " + error.message);
//     }
//   },
//   signOut: async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       toast.error("Error logging out");
//     }
//   },
// };