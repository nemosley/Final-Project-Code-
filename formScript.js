// User Registration Form - DOM Manipulation & Validation

// Get form and message elements
const registrationForm = document.getElementById('registrationForm');
const resultMessage = document.getElementById('resultMessage');

// Handle form submission
registrationForm.addEventListener('submit', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get form input values
    const fullName = document.getElementById('name').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('pwd').value.trim();
    const age = document.getElementById('userAge').value.trim();
    const gender = document.querySelector('input[name="genderInput"]:checked');
    const country = document.getElementById('countrySelect').value;
    const terms = document.getElementById('termsCheckbox').checked;

    // Validation
    let isValid = true;
    let errorMessages = [];

    // Validate required fields
    if (!fullName) {
        isValid = false;
        errorMessages.push('Full Name is required.');
    }

    if (!email) {
        isValid = false;
        errorMessages.push('Email is required.');
    }

    if (!password) {
        isValid = false;
        errorMessages.push('Password is required.');
    }

    if (!gender) {
        isValid = false;
        errorMessages.push('Gender must be selected.');
    }

    if (!country) {
        isValid = false;
        errorMessages.push('Country is required.');
    }

    // Validate terms checkbox
    if (!terms) {
        isValid = false;
        errorMessages.push('You must agree to the Terms and Conditions.');
    }

    // Display messages
    resultMessage.innerHTML = '';

    if (!isValid) {
        // Display error message
        resultMessage.className = 'message-box error';
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Registration Failed';
        resultMessage.appendChild(errorTitle);

        const errorList = document.createElement('ul');
        errorMessages.forEach(msg => {
            const li = document.createElement('li');
            li.textContent = msg;
            errorList.appendChild(li);
        });
        resultMessage.appendChild(errorList);
    } else {
        // Display success message
        resultMessage.className = 'message-box success';
        const successMsg = document.createElement('p');
        successMsg.innerHTML = `Hello ${fullName}! U with email ${email} and password ${password}. Your form has been successfully submitted.`;
        resultMessage.appendChild(successMsg);

    
    }
});

