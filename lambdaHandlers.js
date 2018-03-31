const gdax = require(`./src/gdaxClients.js`);
const DepositFundsCommand = require(`./src/commands/depositFundsCommand.js`);
const BuyCommand = require(`./src/commands/buyCommand.js`);

const sandBoxMode = process.env.GDAX_USE_SANDBOX === 'true';
const currencyCode = `USD`;

const authdClient = gdax.authenticatedApi(sandBoxMode);

exports.DepositHandler = (event, context, callback) => {

    let depositAmount = 100;
    let depositCommand = new DepositFundsCommand(authdClient, depositAmount);
    depositCommand.execute();

};