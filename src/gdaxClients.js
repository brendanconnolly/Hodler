const Gdax = require('gdax');

const gdaxApiUrl = (sandBoxMode) => sandBoxMode ? 'https://api-public.sandbox.gdax.com' : 'https://api.gdax.com';


//yeah these need to go
const apiKey = `7d2a8d516afdb3b3eea90f02da32ed51`;
const apiSecret = `MEO+hjZ750Wy9AbdwH3qLVYaDmPLzuBFC/YMFUJ7T6D7oCj0CrVNOpG4M2d8JB4I/TW+jUdkyyTtYuWPhyntdQ==`;
const apiPassphrase = `sandyPass`;

const publicApi = (sandBoxMode = true) => {
    let uri = gdaxApiUrl(sandBoxMode);
    if (sandBoxMode) {
        console.log(uri);
    }
    return new Gdax.PublicClient(uri)
};

const authenticatedApi = (sandBoxMode = true) => {
    let uri = gdaxApiUrl(sandBoxMode);
    if (sandBoxMode) {
        console.log(uri);
    }
    return new Gdax.AuthenticatedClient(apiKey, apiSecret, apiPassphrase, uri);
};

module.exports = {
    publicApi,
    authenticatedApi
};

