// Function to handle the redirect after authorization
function handleRedirect() {
    // Get the 'code' query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      // Send the code to your Apps Script backend to exchange for an access token
      fetch('https://script.google.com/macros/s/AKfycbzUODbjTYMvw0SYDLhfdvHhSUxxVtyYt_QFEO33J2y_AXsq7X2qasNlTVrMmuukd6W_UQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=exchangeCode&code=' + code
      })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          // Store the access token in sessionStorage
          sessionStorage.setItem('accessToken', data.accessToken);
  
          // Redirect to the main application page, including the access token in the URL
          window.location.replace('https://craiga3.github.io/?accessToken=' + data.accessToken); 
        } else {
          console.error("Error exchanging code for access token:", data.error);
          displayErrorMessage("Error exchanging code for access token.");
        }
      })
      .catch(error => {
        console.error('Error exchanging code for access token:', error);
        displayErrorMessage("Error exchanging code for access token.");
      });
    } else {
      displayErrorMessage("Authorization code not found.");
    }
  }
  
  // Function to display an error message
  function displayErrorMessage(message) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `<h1>Error</h1><p>${message}</p>`;
  }
  
  // Call the handleRedirect function on page load
  window.onload = handleRedirect;
  