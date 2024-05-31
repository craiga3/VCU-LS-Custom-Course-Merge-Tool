
# VCU Canvas Course Merging Tool

This repository contains a custom tool developed by VCU Learning Systems to merge Canvas courses. This tool is designed to simplify the process of combining multiple course sections into a single parent course, making it easier for instructors to manage their courses and for students to access course materials. 

## Features

- **Term Selection:** Choose the specific academic term containing the courses you wish to merge.
- **Course Selection:**  View a list of courses where you are enrolled as a teacher and select multiple courses for merging.
- **Parent Course Creation:** Provide a name for the new parent course that will house the merged content.
- **Automatic Merging:** The tool automatically handles the merging process, creating a new parent course and cross-listing the selected sections into it.
- **User-Friendly Interface:** The tool provides a simple and intuitive interface to guide users through the merging process.

## Files

- **index.html:** This is the main HTML file that contains the user interface of the tool.
- **redirect.js:** This JavaScript file handles the OAuth redirect process after the user authorizes the tool to access their Canvas account.
- **redirect.html:** This is a simple HTML file that displays a "Redirecting, please wait..." message during the OAuth redirect process.
- **scripts.js:** This JavaScript file contains the logic for fetching data from the Canvas API, interacting with the user interface, and handling the course merging process.
- **style.css:** This CSS file provides the styling for the tool's user interface.
- **GAS.js:** This is the Google Apps Script file that acts as the backend for the tool. It handles the authentication with Canvas, makes API calls to Canvas, and performs the actual course merging operations. Deploy the Apps Script project as an API.

## Usage

1. **Deployment:** Deploy the Google Apps Script code to your Google Apps Script account.
2. **Configuration:** Set up the necessary configuration in the Google Apps Script code. Update the script properties with your Canvas instance URL, API key, and other required settings.
3. **Canvas Configuration** Set up the OAUTH2 API Key in Canvas under Development Keys
4. **Access the Tool:** Access the deployed web app through its URL.
5. **Authorize Canvas Login:**  Click the "Authorize Canvas Login" button and follow the prompts to grant the tool access to your Canvas account.
6. **Follow the on-screen instructions:** Select the term and courses you want to merge, provide a name for the parent course, and confirm the merge.

## Configuring 

1. **Script Properties:** Several sensitive variables are configured as Script Properties, as to not hardcode any sensitive values in the Middleware or Frontend. The following script properties must be configured.
    * `domain_instance`: The domain for your Canvas instance: `https://<instance>.instructure.com`
    * `elevated_token`: An API token provided from an administrative service account. This is used for creating the new course shell and getting enrollment terms in Canvas
    * `home_uri`: The 'homepage' of this tool, also can be the DNS record
    * `oauth_client_id`: The OAUTH2 Client ID from the Developer API token configuration in Canvas
    * `oauth_client_secret`: The OAUTH2 Secret from the Developer API token configuration in Canvas
    * `redirect_uri`: the URL of the `redirect.html` page from this tool. Will likely be `https://<DNSForTool>.edu/redirect.html`
2. **Canvas API Token Properties**: These values need to be configured for the API Key Settings in Canvas. 
    * `Key Name`: Give the key a name. This is what will be shown with the OAUTH2 Authorization page.
    * `Owner Email`: Optional - but generally a good idea to have the email of the responsible party for support.
    * `Redirect URIs`: the same value entered in the Apps Script Property with the same name. `https://<DNSForTool>.edu/redirect.html`
3. **API Token Scope**: The Developer API token in Canvas can be scoped to the following API Calls (When configuring, also check the box for `Allow Include Parameters`.)
    * `url:GET|/api/v1/users/:user_id/profile`
    * `url:GET|/api/v1/users/:user_id/enrollments`
    * `url:GET|/api/v1/courses/:id`
    * `url:POST|/api/v1/sections/:id/crosslist/:new_course_id`

## Support 

Coming Soon

**Note:** To use this tool, you must have a teacher enrollment in the Canvas courses you want to merge.
