const gdax = require(`./src/gdaxClients.js`);
const DepositFundsCommand = require(`./src/commands/depositFundsCommand.js`);
const BuyCommand = require(`./src/commands/buyCommand.js`);

const sandBoxMode = process.env.GDAX_USE_SANDBOX === 'true';
const currencyCode = `USD`;

const authdClient = gdax.authenticatedApi(sandBoxMode);
const publicClient = gdax.publicApi(sandBoxMode);

const percentBelowMarket = process.env.PERCENT_BELOW_MARKET;


exports.DepositHandler = (event, context, callback) => {

    let depositAmount = process.env.DEPOSIT_AMOUNT;
    let depositCommand = new DepositFundsCommand(authdClient, depositAmount);
    depositCommand.execute();

};

exports.BuyHandler = (event, context, callback) => {

    let btcAmt = process.env.BTC_AMOUNT;
    let ethAmt = process.env.ETH_AMOUNT;
    let ltcAmt = process.env.LTC_AMOUNT;

    let btcCommand = new BuyCommand(authdClient, publicClient, `BTC`, btcAmt, percentBelowMarket);
    let ethCommand = new BuyCommand(authdClient, publicClient, `ETH`, ethAmt, percentBelowMarket);
    let ltcCommand = new BuyCommand(authdClient, publicClient, `LTC`, ltcAmt, percentBelowMarket);

    btcCommand.execute();
    ethCommand.execute();
    ltcCommand.execute();



};