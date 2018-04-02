const GetWalletBalanceCommand = require(`./getWalletBalanceCommand.js`);

function BuyCommand(authenticatedClient, publicClient, coinTicker, fiatAmount, atPercentBelowMarket, currencyCode = `USD`) {
    this.authdClient = authenticatedClient;
    this.publicClient = publicClient;
    this.currencyCode = currencyCode;
    this.coinTicker = coinTicker;
    this.fiatAmount = fiatAmount;
    this.atPercentBelowMarket = atPercentBelowMarket;

};

BuyCommand.prototype.getProductId = function (coinTicker) {
    return `${coinTicker}-${this.currencyCode}`;
};

BuyCommand.prototype.getCoinQuantity = function (fiatAmount, coinPrice) {
    let potentialAmt = +fiatAmount / +coinPrice;
    return potentialAmt.toFixed(4);
}

BuyCommand.prototype.getCoinPrice = async function (coinTicker, pointsBelowMarket) {

    let productName = this.getProductId(coinTicker);
    return new Promise((resolve, reject) => {
        this.publicClient.getProduct24HrStats(productName).then(data => {
            console.log(data);

            let currentPrice = +data.last;
            let percentOfCurrent = (100 - pointsBelowMarket) / 100;
            let desiredPrice = +currentPrice * +percentOfCurrent;

            desiredPrice = desiredPrice.toFixed(2);

            console.log(`${productName} desired price ${desiredPrice}`);

            resolve(desiredPrice)
        })
            .catch(err => {
                console.log(err);
                reject(err)
            });
    });
};

BuyCommand.prototype.execute = async function () {

    let coinPrice = await this.getCoinPrice(this.coinTicker, this.atPercentBelowMarket);
    let coinQty = this.getCoinQuantity(this.fiatAmount, coinPrice);
    let productName = this.getProductId(this.coinTicker);
    let buyRequestData = {
        'type': `limit`,
        'price': coinPrice,
        'size': coinQty,
        'product_id': productName,
        'time_in_force': `GTC`
    }

    let getAccountBalanceCmd = new GetWalletBalanceCommand(this.authdClient, this.currencyCode);
    let accountBalance = await getAccountBalanceCmd.execute();

    if (accountBalance.available > this.fiatAmount) {
        console.log(buyRequestData);

        await this.authdClient.buy(buyRequestData).then(data => {
            console.log(data);
        })
            .catch(err => console.log(err));
    }
    else {
        console.log(`Insufficient funds for Buy. Have ${accountBalance.available} / Need ${this.fiatAmount}`);
    }


};

module.exports = BuyCommand;