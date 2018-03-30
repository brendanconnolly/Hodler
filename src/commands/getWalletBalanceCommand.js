function GetWalletBalanceCommand(authenticatedClient, currencyCode = `USD`) {
    this.authdClient = authenticatedClient;
    this.currencyCode = currencyCode;
};


GetWalletBalanceCommand.prototype.execute = async function () {
    return new Promise((resolve, reject) => {
        this.authdClient.getAccounts()
            .then(data => {
                console.log(data);
                let account = data.find(x => x.currency === this.currencyCode);
                resolve({
                    'balance': account.balance,
                    'available': account.available
                });
            })
            .catch(err => {
                console.log(err);
                reject(err)
            });
    });

};

module.exports = GetWalletBalanceCommand;