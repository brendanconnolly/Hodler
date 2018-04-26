function DepositFundsCommand(authenticatedClient, amount, accountType = `ach_bank_account`, currencyCode = `USD`) {

    this.authdClient = authenticatedClient;
    this.currencyCode = currencyCode;
    this.amount = amount;
    this.walletName = accountType;
};

DepositFundsCommand.prototype.getWalletData = async function getWalletData(name) {
    return new Promise((resolve, reject) => {

        this.authdClient.getPaymentMethods().then(data => {
            console.log(data);
            let fiatWallet = data.find(x => x.type === name);
            console.log(fiatWallet);
            resolve(fiatWallet);
        })
            .catch(err => reject(err));
    });
};

DepositFundsCommand.prototype.depositIntoAccount = async function depositIntoAccount(paymentMethodId, amount, currency = this.currencyCode) {

    return new Promise((resolve, reject) => {
        this.authdClient.depositPayment({ 'amount': amount, 'currency': currency, 'payment_method_id': paymentMethodId, })
            .then(data => {
                console.log(data);
                resolve(data)
            })
            .catch(err => reject(err));
    });
};

DepositFundsCommand.prototype.execute = async function execute() {

    let walletData = await this.getWalletData(this.walletName);
    await this.depositIntoAccount(walletData.id, this.amount, this.currencyCode);

};

module.exports = DepositFundsCommand;



