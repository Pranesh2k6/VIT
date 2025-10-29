document.getElementById('signup-form').addEventListener('submit', function(event) {
    // CRITICAL: Stop the default form submission (which prevents page reload)
    event.preventDefault(); 
    
    // TEMPORARY BYPASS: Navigate immediately on click
    console.log("Validation bypassed. Navigating to choose-galaxy.html");
    window.location.href = 'choose-galaxy.html'; 
});

// Add the subject selection toggle back for completeness
document.querySelectorAll('.subject').forEach(subjectDiv => {
    subjectDiv.addEventListener('click', () => {
        subjectDiv.classList.toggle('selected');
    });
});