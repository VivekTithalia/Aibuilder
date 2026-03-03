// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "aibuilder-7dc3d.firebaseapp.com",
    projectId: "aibuilder-7dc3d",
    storageBucket: "aibuilder-7dc3d.firebasestorage.app",
    messagingSenderId: "590212576680",
    appId: "1:590212576680:web:9d5f7ba0c3dae0591c999d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }