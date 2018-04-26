const env = require('dotenv').config();
const gdax = require(`./src/gdaxClients.js`);

const DepositFundsCommand = require(`./src/commands/depositFundsCommand.js`);
const BuyCommand = require(`./src/commands/buyCommand.js`);
const RunOnDaysOfMonthCommand = require(`./src/commands/runOnDaysOfMonthCommand.js`);

const currencyCode = `USD`;
const sandBoxMode = true;

const publicClient = gdax.publicApi(sandBoxMode);
const authdClient = gdax.authenticatedApi(sandBoxMode);

const percentBelowMarket = process.env.PERCENT_BELOW_MARKET || 2.5;
const btcAmt = process.env.BTC_AMOUNT;
const ethAmt = process.env.ETH_AMOUNT;
const ltcAmt = process.env.LTC_AMOUNT;

getBuyCommands = () => {

    let btcCommand = new BuyCommand(authdClient, publicClient, `BTC`, btcAmt, percentBelowMarket);
    let ethCommand = new BuyCommand(authdClient, publicClient, `ETH`, ethAmt, percentBelowMarket);
    let ltcCommand = new BuyCommand(authdClient, publicClient, `LTC`, ltcAmt, percentBelowMarket);


    let buysMap = new Map();

    buysMap.set(`gimmie bitcoin`, btcCommand);
    buysMap.set(`gimmie ethereum`, ethCommand);
    buysMap.set(`gimmie litecoin`, ltcCommand);

    return buysMap;

};

getDepositCommands = () => {

    let depositsMap = new Map();
    depositsMap.set(`for the gainz`, new DepositFundsCommand(authdClient, 100));

    return depositsMap;

};

(() => {

    let takeMyMoney = getDepositCommands();
    let gimmieCoins = getBuyCommands();

    let depositScheduler = new RunOnDaysOfMonthCommand(takeMyMoney, [1]);
    let buyScheduler = new RunOnDaysOfMonthCommand(gimmieCoins, [10, 20]);

    depositScheduler.execute();
    buyScheduler.execute();


})();