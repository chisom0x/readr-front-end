const apiUrl = 'https://readr-back-end.onrender.com/readr/auth/login';

document
  .getElementById('login-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    const alertBox = document.getElementById('alert');
    const submitButton = document.getElementById('submit-button');

    // Show loading state
    submitButton.textContent = 'Loading...';
    submitButton.disabled = true;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {
        // Save token to localStorage
        localStorage.setItem('authToken', result.token);
        // Show success message
        alertBox.className = 'alert-success alert-container p-4 rounded-lg';
        alertBox.textContent = result.message || 'Login successful!';
        alertBox.classList.remove('hidden'); // Ensure the alert box is displayed

        // Redirect to homepage or dashboard after a short delay
        setTimeout(() => {
          window.location.href = '../public/index.html'; // Change this to your homepage URL if different
        }, 2000); // Delay in milliseconds
      } else {
        // Show error message
        alertBox.className = 'alert-error alert-container p-4 rounded-lg';
        alertBox.textContent = result.message || 'Login failed';
        alertBox.classList.remove('hidden'); // Ensure the alert box is displayed
      }
    } catch (error) {
      // Show error message for network or other unexpected errors
      alertBox.className = 'alert-error alert-container p-4 rounded-lg';
      alertBox.textContent = 'An error occurred. Please try again.';
      alertBox.classList.remove('hidden'); // Ensure the alert box is displayed
      console.error('Error during login:', error);
    } finally {
      // Hide loading state
      submitButton.textContent = 'Login';
      submitButton.disabled = false;
    }
  });
