require('dotenv').config(); // Loads environment variables from the .env file
const axios = require('axios');

// Conjur configuration (store these in the .env file)
const CONJUR_URL = process.env.CONJUR_URL;
const CONJUR_ACCOUNT = process.env.CONJUR_ACCOUNT;
const CONJUR_AUTHN_URL = `${CONJUR_URL}/authn/${CONJUR_ACCOUNT}`;
const CONJUR_SECRET_ID = process.env.CONJUR_SECRET_ID;
const CONJUR_USER_ID = process.env.CONJUR_USER_ID; // Conjur user ID
const CONJUR_API_KEY = process.env.CONJUR_API_KEY; // Conjur API Key

// Function to authenticate to Conjur using API Key
async function authenticateConjur() {
  try {
    // Makes an authentication request to Conjur
    const response = await axios({
      method: 'post',
      url: `${CONJUR_AUTHN_URL}/${CONJUR_USER_ID}/authenticate`,
      auth: {
        username: CONJUR_USER_ID,
        password: CONJUR_API_KEY
      }
    });

    // The authentication token is returned as plain text
    const conjurAuthToken = Buffer.from(response.data, 'utf-8').toString('base64'); // Convert to base64
    console.log('Successfully authenticated to Conjur!');
    return conjurAuthToken;
  } catch (error) {
    console.error('Error during Conjur authentication:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to retrieve the secret from Conjur
async function fetchSecret(conjurAuthToken) {
  try {
    const response = await axios.get(`${CONJUR_URL}/secrets/${CONJUR_ACCOUNT}/variable/${CONJUR_SECRET_ID}`, {
      headers: {
        'Authorization': `Token token="${conjurAuthToken}"`
      }
    });

    console.log('Secret retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching secret:', error.response ? error.response.data : error.message);
  }
}

// Main function
(async () => {
  try {
    // Authenticate to Conjur and obtain the authentication token
    const conjurAuthToken = await authenticateConjur();

    // Use the authentication token to fetch the secret
    const secret = await fetchSecret(conjurAuthToken);
  } catch (error) {
    console.error('Error in the process:', error.message);
  }
})();
