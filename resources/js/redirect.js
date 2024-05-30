document.addEventListener("DOMContentLoaded", async () => {
    // Extract the authorization code and error from the URL
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code');
    const error = params.get('error');

    // Function to redirect to the main page
    const redirectToMainPage = () => {
        const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
        window.location.href = `${currentPath}/`;
    };

    // If there is an error and it is 'access_denied', redirect to the main page
    if (error === 'access_denied') {
        console.error('Authorization was denied by the user.');
        redirectToMainPage();
        return;
    }

    // If no authorization code is found, log an error and stop the execution
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

        // Send request to get User Profile
        const userPayload = new URLSearchParams();
        userPayload.append('action', 'getUserInfo');
        userPayload.append('accessToken', responseData.accessToken); 

        const userResponse = await fetch('https://script.google.com/macros/s/AKfycbzUODbjTYMvw0SYDLhfdvHhSUxxVtyYt_QFEO33J2y_AXsq7X2qasNlTVrMmuukd6W_UQ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: userPayload
        });

        if (!userResponse.ok) {
            throw new Error(`Error fetching user info: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();

        // Store the user info in session storage
        sessionStorage.setItem('userInfo', JSON.stringify(userData));

        // Redirect back to the main page
        redirectToMainPage();
    } catch (error) {
        console.error('Error during code exchange:', error);
        redirectToMainPage(); // Redirect to the main page in case of an error
    }
});
