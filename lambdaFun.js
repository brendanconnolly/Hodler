const gdax = require(`./gdaxClients.js`);
const DepositFundsCommand = require(`./commands/depositFundsCommand.js`);
const BuyCommand = require(`./commands/buyCommand.js`);

const sandBoxMode = process.env.GDAX_USE_SANDBOX === 'true';
const currencyCode = `USD`;

const authdClient = gdax.authenticatedApi(sandBoxMode);

exports.DepositHandler = (event, context) => {

    let depositAmount = 100;
    let depositCommand = new DepositFundsCommand(authdClient);
    depositCommand.execute(depositAmount);

};