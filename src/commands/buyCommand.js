function BuyCommand(authenticatedClient, publicClient, useSandBox = true, currencyCode = `USD`) {
    this.authdClient = authenticatedClient;
    this.publicClient = publicClient;
    this.currencyCode = currencyCode;
};

BuyCommand.prototype.getProductId = function (coinTicker) {
    return `${coinTicker}-${this.currencyCode}`;
};

BuyCommand.prototype.getCoinQuantity = function (fiatAmount, coinPrice) {
    let potentialAmt = +fiatAmount / +coinPrice;

}

BuyCommand.prototype.getCoinPrice = async function (coinTicker) {

    let productName = this.getProductId(coinTicker);
    return new Promise((resolve, reject) => {
        this.publicClient.getProductHistoricRates(productName).then(data => {
            console.log(data);
            resolve(data)
        })
            .catch(err => {
                console.log(err);
                reject(err)
            });
    });
};

BuyCommand.prototype.execute = async function execute(coinTicker, fiatAmount) {

    let coinPrice = await this.getCoinPrice();
    let coinQty = this.getCoinQuantity(fiatAmount, coinPrice);
    let productName = this.getProductId(coinTicker);
    let buyRequestData = {
        'type': `limit`,
        'price': coinPrice,
        'size': coinQty,
        'product': productName,
        'time_in_force': `GTC`


    }
    await this.authdClient.buy(buyRequestData).then(data => {
        console.log(data);
        resolve(data)
    })
        .catch(err => reject(err));

};

module.exports = BuyCommand;