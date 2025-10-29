// --- 1. Tab Switching Functionality ---
document.getElementById('login-tab').addEventListener('click', function() {
    // Logic to show the Login form and hide the Sign Up form (assuming they are in separate containers)
    // You'll need to update your HTML structure to easily toggle between a Login Card and a Sign Up Card.
    // For now, this button should likely redirect to the login HTML itself if the sign up HTML is a separate page.
    console.log("Login tab clicked. Functionality pending separate sign up page.");
});

// Since you are sending the Sign Up page separately, let's make this button functional:
document.getElementById('signup-tab').addEventListener('click', function() {
    // **ASSUMING** your sign-up HTML page is named 'signup.html'
    window.location.href = 'signup.html';
});


// --- 2. Login & Navigation Functionality ---
document.getElementById('login-form').addEventListener('submit', function(event) {
    // 1. Prevent the default form submission (which reloads the page)
    event.preventDefault(); 
    
    // 2. Perform a basic check (In a real app, you would send this to a server)
    const emailInput = document.querySelector('input[type="email"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;

    if (emailInput.length > 0 && passwordInput.length >= 6) {
        // --- 3. Navigation to the next page ---
        console.log("Login successful! Navigating to galaxy selection.");
        // **NAVIGATES TO THE NEXT PAGE:**
        window.location.href = 'choose-galaxy.html'; 
    } else {
        // Simple error feedback
        alert("Please enter a valid email and a password (at least 6 characters).");
    }
});