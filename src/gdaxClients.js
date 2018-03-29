const Gdax = require('gdax');

const gdaxApiUrl = (sandBoxMode) => sandBoxMode ? 'https://api-public.sandbox.gdax.com' : 'https://api.gdax.com';


//yeah these need to go
const apiKey = ``;
const apiSecret = ``;
const apiPassphrase = `xxx`;

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

