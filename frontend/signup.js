// --- 1. Subject Selection Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const subjects = document.querySelectorAll('.subject');
    
    subjects.forEach(subjectDiv => {
        subjectDiv.addEventListener('click', () => {
            // Toggles the 'selected' class on click
            subjectDiv.classList.toggle('selected');
        });
    });
});

// --- 2. Sign Up Form Validation and Navigation ---
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission
    
    // Get required input values (using the added 'id' for the form)
    const fullName = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const selectedClass = this.querySelector('select').value;
    const agreementChecked = this.querySelector('input[type="checkbox"]').checked;

    // Get selected subjects
    const selectedSubjects = Array.from(document.querySelectorAll('.subject.selected'))
                                  .map(div => div.textContent);
    
    // Basic Validation Checks
    if (!fullName || !email || password.length < 6 || !selectedClass) {
        alert("Please fill in all required fields. Password must be at least 6 characters.");
        return; 
    }
    
    if (selectedSubjects.length === 0) {
        alert("Please select at least one Subject Galaxy to begin your journey.");
        return;
    }
    
    if (!agreementChecked) {
        alert("You must agree to the cosmic terms to continue!");
        return;
    }

    // --- 3. Successful Sign Up Simulation (In a real app, this sends data to a server) ---
    console.log("New Explorer Profile Created:", {
        name: fullName,
        email: email,
        class: selectedClass,
        subjects: selectedSubjects
    });

    // Store the selected subjects (optional, but good for personalized onboarding)
    localStorage.setItem('userSubjects', JSON.stringify(selectedSubjects));

    // --- 4. Navigation ---
    alert("Welcome to Clario! Your journey begins now.");
    // Redirect to the galaxy selection page (or straight to the dashboard)
    window.location.href = 'choose-galaxy.html'; 
});