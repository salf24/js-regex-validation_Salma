// Referencing the form
const form = document.getElementById("validationForm");

// Validation patterns for each field
const fields = {
    fullName: /^[A-Za-z\s]+$/, // Only letters and spaces allowed
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
    phone: /^\d{10,15}$/, // 10 to 15 digits
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ // Min 8 chars, 1 uppercase, 1 lowercase, 1 number
};

/**
 * Validates a given input field using regular expressions
 * @param {HTMLElement} input 
 * @returns {boolean} 
 */
function validateField(input) {
    const regex = fields[input.id]; // Get the corresponding regex pattern
    const errorLabel = document.getElementById(input.id + "Error"); // Get associated error label

    if (!regex || !errorLabel) return false; // Prevent errors if element is missing

    const isValid = regex.test(input.value.trim()); // Test input against regex

    // Apply styles based on validation result
    input.classList.toggle("invalid", !isValid);
    input.classList.toggle("success", isValid);

    // Display error message if invalid
    errorLabel.textContent = isValid ? "" : input.dataset.error || "Invalid input"; 

    return isValid; // Return validation result
}

// Attach real-time validation event to all input fields
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => validateField(input)); 
});

// Form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate all fields
    const allValid = Object.keys(fields).every(id => validateField(document.getElementById(id)));

    console.log("Validation result:", allValid); // Debugging line

    // Show success message if all fields are valid
    if (allValid) {
        alert("Form submitted successfully!");
    }
});
