import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBM2FXaAJB4o_f5xBY4uWxbTpPwKl8Vp4k",
  authDomain: "minly-945df.firebaseapp.com",
  projectId: "minly-945df",
  storageBucket: "minly-945df.appspot.com",
  messagingSenderId: "627804423082",
  appId: "1:627804423082:web:c0f834c97b0d74f67b61d3",
  measurementId: "G-97RLPLBYQC"
};

//? Initialize Firebase
const app = initializeApp(firebaseConfig);

//? Firebase main functions
const auth = getAuth(app)
const storage = getStorage(app)
const rtdb = getDatabase(app);

export { auth, storage, rtdb }