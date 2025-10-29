import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
  // ... your Firebase Configuration Object goes here
});

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('Logged in!');
  } else {
    console.log('No user');
  }
});