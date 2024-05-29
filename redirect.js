document.addEventListener("DOMContentLoaded", async () => {
    // Extract the authorization code from the URL
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code');
    console.log(authorizationCode);
    if (!authorizationCode) {
        console.error('No authorization code found.');
        return;
    }

    try {
        // Prepare the payload
        const payload = new URLSearchParams();
        payload.append('action', 'exchangeCode');
        payload.append('code', authorizationCode);
        payload.append('accessToken', 'NULL');  // Include an empty accessToken

        // Send a POST request to the Google Apps Script endpoint
        const response = await fetch('https://script.google.com/macros/s/AKfycbzUODbjTYMvw0SYDLhfdvHhSUxxVtyYt_QFEO33J2y_AXsq7X2qasNlTVrMmuukd6W_UQ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`Error exchanging code: ${response.statusText}`);
        }

        const responseData = await response.json();

        // Handle the response from Google Apps Script
        console.log('Response from Google Apps Script:', responseData);

        // Store the access token in session storage
        sessionStorage.setItem('accessToken', responseData.accessToken);

        // Redirect back to the main page
        window.location.href = 'https://craiga3.github.io/VCU-LS-Custom-Course-Merge-Tool/';
    } catch (error) {
        console.error('Error during code exchange:', error);
    }
});
