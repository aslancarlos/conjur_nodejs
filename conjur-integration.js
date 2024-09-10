const axios = require('axios');

// Configurações do Conjur
const CONJUR_URL = 'https://your-conjur-cloud-url';
const CONJUR_ACCOUNT = 'your-conjur-account';
const AUTH_TOKEN = 'your-auth-token'; // JWT ou API Key
const SECRET_ID = 'your-secret-id';

async function fetchSecret() {
  try {
    const response = await axios.get(`${CONJUR_URL}/secrets/${CONJUR_ACCOUNT}/variable/${SECRET_ID}`, {
      headers: {
        'Authorization': `Token token="${AUTH_TOKEN}"`
      }
    });

    console.log('Segredo:', response.data);
  } catch (error) {
    console.error('Erro ao buscar segredo:', error.response ? error.response.data : error.message);
  }
}

fetchSecret();
