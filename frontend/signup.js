// signup.js

// =================================================================
// 1. IMPORT NECESSARY MODULES
// =================================================================
import { auth, db } from './firebase-config.js'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 

// Get HTML element references (using the IDs from your signup.html)
const signupForm = document.getElementById('signup-form');
const nameInput = document.getElementById('nameInput'); 
const emailInput = document.getElementById('signupEmailInput'); 
const passwordInput = document.getElementById('signupPasswordInput');
const classSelect = document.getElementById('classSelect');
const errorMessageDisplay = document.getElementById('auth-error-message');

// =================================================================
// 2. FORM SUBMISSION LOGIC (Firebase Auth and Firestore)
// =================================================================
signupForm.addEventListener('submit', async (event) => {
    // CRITICAL: Stop the default form submission (page reload)
    event.preventDefault(); 
    
    // Clear any previous error messages
    errorMessageDisplay.textContent = '';
    
    // Get form input values
    const name = nameInput.value; 
    const email = emailInput.value; 
    const password = passwordInput.value;
    const selectedClass = classSelect.value;
    
    // Get selected subjects (assuming you have elements with class="subject selected")
    const selectedSubjects = Array.from(document.querySelectorAll('.subject.selected'))
                                  .map(div => div.dataset.subject); 

    try {
        // A. Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // B. Use the user's unique ID (UID) as the document ID in Firestore
        const userRef = doc(db, "users", user.uid);
        
        // C. Save the custom user data to Firestore
        await setDoc(userRef, {
            name: name,
            email: user.email,
            class: selectedClass, 
            selectedSubjects: selectedSubjects, 
            createdOn: new Date(),
            rank: 'Space Cadet',
            credits: 100 
        });

        // SUCCESS: User registered and data saved. 
        console.log("Space Explorer created! Attempting redirect...");
        
        // 🚀 FINAL REDIRECT: To your specific local server URL
        window.location.href = 'http://127.0.0.1:5500/choose-galaxy.html'; 

    } catch (error) {
        // Handle and display Firebase Auth errors
        console.error("Sign Up Error:", error.code, error.message);
        
        let message = 'An unknown cosmic error occurred. Try again.';

        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This email is already registered. Try logging in.';
                break;
            case 'auth/weak-password':
                message = 'Password is too weak. Must be at least 6 characters.';
                break;
            case 'auth/invalid-email':
                message = 'The email address is improperly formatted.';
                break;
            // Includes Firestore Permission Denied errors if the write fails
            default:
                message = `Mission failed (${error.code}). Check browser console (F12).`;
                break;
        }

        errorMessageDisplay.textContent = message;
    }
});

// =================================================================
// 3. SUBJECT SELECTION LOGIC
// =================================================================
document.querySelectorAll('.subject').forEach(subjectDiv => {
    subjectDiv.addEventListener('click', () => {
        subjectDiv.classList.toggle('selected');
    });
});