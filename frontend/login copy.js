// Function to handle form submission (Login and navigation)
document.getElementById('login-form').addEventListener('submit', function(event) {
    // Prevent the default form submission (which causes a page reload)
    event.preventDefault(); 
    
    // Retrieve the input values for validation
    // We use 'this' to refer to the form element
    const emailInput = this.querySelector('input[type="email"]').value;
    const passwordInput = this.querySelector('input[type="password"]').value;

    // Basic Validation Check
    if (emailInput.length > 0 && passwordInput.length >= 6) {
        // Log the event (optional)
        console.log("Login successful! Navigating to galaxy selection.");
        
        // Redirect to the galaxy selection page
        window.location.href = 'choose-galaxy.html'; 
    } else {
        // Provide user feedback on error
        alert("Please enter a valid email and a password (at least 6 characters).");
    }
});

// Functionality for the "Sign Up" button/tab navigation
document.getElementById('signup-tab').addEventListener('click', function() {
    // Redirect to the Sign Up page
    window.location.href = 'signup.html';
});

// Functionality for the "Login" button/tab (in case it is clicked again)
document.getElementById('login-tab').addEventListener('click', function() {
    // Redirect to the current Login page (useful if you expand to one-page login/signup)
    window.location.href = 'login.html';
});