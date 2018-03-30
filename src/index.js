const gdax = require(`./gdaxClients.js`);
const DepositFundsCommand = require(`./commands/depositFundsCommand.js`);
const BuyCommand = require(`./commands/buyCommand.js`);
const ScheduleCommand = require(`./commands/scheduledCommand.js`);

const currencyCode = `USD`;
const sandBoxMode = true;

const publicClient = gdax.publicApi(sandBoxMode);
const authdClient = gdax.authenticatedApi(sandBoxMode);

(async () => {
    let buyCommand = new BuyCommand(authdClient, publicClient);
    let depositCommand = new DepositFundsCommand(authdClient);


    let testScheduleCmd = new ScheduleCommand(`testes`, () => console.log(`meats`), { second: [1, 5, 10, 15, 20, 25] });

    testScheduleCmd.execute();
    console.log(`bbq`);
    //await depositCommand.execute(100);

    //await buyCommand.execute(`BTC`, fiatAmount = 100, atPercentBelowMarket = 2.5);
})();