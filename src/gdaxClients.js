const Gdax = require('gdax');

const gdaxApiUrl = (sandBoxMode) => sandBoxMode ? 'https://api-public.sandbox.gdax.com' : 'https://api.gdax.com';


//yeah these need to go
const apiKey = process.env.GDAX_API_KEY;
const apiSecret = process.env.GDAX_API_SECRET;
const apiPassphrase = process.env.GDAX_API_PASSPHRASE;

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

