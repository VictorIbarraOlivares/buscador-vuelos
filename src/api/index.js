import qs from 'qs';
import axios from 'axios';

const BASE_URL = `https://test.api.amadeus.com/`;

export async function getToken() {
  try {
    const response = await axios.post(
      `${BASE_URL}v1/security/oauth2/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'h46J0CS4MCoyAW0EpcMLUdCmO7652iqm', // variable de entorno
        client_secret: 'XM71VjOqFYkRFMFy' // variable de entorno
      }),
      { headers: { "content-type": "application/x-www-form-urlencoded" },}
    )
    console.log('getToken response', response);
    return response;
  } catch (error) {
    console.error('getToken error', error);
    return error;
  }
}

export async function apiCall(url, token) {
  try {
    const response = await axios.get(
      `${BASE_URL}${url}`,
      { headers: { 'Authorization': `Bearer ${token}` }}
    );
    console.log('searchFlights', response);
    return response;
  } catch (error) {
    console.error('searchFlights error', error);
    return error;
  }
}