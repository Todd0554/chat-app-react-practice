import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0J0_tUp9YVf8XhoXmwl4oaKVKFxtgwVg",
  authDomain: "mfchat-aee4a.firebaseapp.com",
  projectId: "mfchat-aee4a",
  storageBucket: "mfchat-aee4a.appspot.com",
  messagingSenderId: "162794448818",
  appId: "1:162794448818:web:0b32b39170d7ad50bea6ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()