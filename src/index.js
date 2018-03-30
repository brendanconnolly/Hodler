const gdax = require(`./gdaxClients.js`);

const DepositFundsCommand = require(`./commands/depositFundsCommand.js`);
const BuyCommand = require(`./commands/buyCommand.js`);


const currencyCode = `USD`;
const sandBoxMode = true;

const publicClient = gdax.publicApi(sandBoxMode);
const authdClient = gdax.authenticatedApi(sandBoxMode);

(async () => {
    let buyCommand = new BuyCommand(authdClient, publicClient);
    let depositCommand = new DepositFundsCommand(authdClient);

    //await depositCommand.execute(100);

    await buyCommand.execute(`BTC`, fiatAmount = 500, atPercentBelowMarket = 2.5);
})();