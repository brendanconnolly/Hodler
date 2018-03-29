function DepositFundsCommand(authenticatedClient, useSandBox = true, currencyCode = `USD`) {

    this.authdClient = authenticatedClient;
    this.currencyCode = currencyCode;
};

DepositFundsCommand.prototype.getWalletData = async function getWalletData(name) {
    return new Promise((resolve, reject) => {
        this.authdClient.getCoinbaseAccounts().then(data => {
            let fiatWallet = data.find(x => x.name === name);
            console.log(fiatWallet.id);
            resolve(fiatWallet);
        })
            .catch(err => reject(err));
    });
};

DepositFundsCommand.prototype.depositIntoAccount = async function depositIntoAccount(paymentMethodId, amount, currency = this.currencyCode) {

    return new Promise((resolve, reject) => {
        this.authdClient.deposit({ 'amount': amount, 'currency': currency, 'coinbase_account_id': paymentMethodId, })
            .then(data => {
                console.log(data);
                resolve(data)
            })
            .catch(err => reject(err));
    });
};

DepositFundsCommand.prototype.execute = async function execute(amount, walletName = `USD Wallet`) {

    let walletData = await this.getWalletData(walletName);
    await this.depositIntoAccount(walletData.id, amount);

};

module.exports = DepositFundsCommand;



