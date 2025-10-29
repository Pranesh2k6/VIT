// firebase-config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getAnalytics } from "firebase/analytics"; // Analytics is now correctly initialized

// 1. YOUR UNIQUE FIREBASE CONFIGURATION (Paste your real values here)
const firebaseConfig = {
    // These are your unique keys and IDs
    apiKey: "AIzaSyA313ql-w7b6aR2EUy8LZ9xt5nWPy2C-70",
    authDomain: "clario-50d98.firebaseapp.com",
    projectId: "clario-50d98",
    storageBucket: "clario-50d98.firebasestorage.app",
    messagingSenderId: "723723967064",
    appId: "1:723723967064:web:c19448e305a459c491482d"
};

// 2. Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// 3. Initialize services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp); // CORRECTED: Uses firebaseApp

// 4. EXPORT the services required by other files (auth and db)
export { 
    auth, 
    db 
};