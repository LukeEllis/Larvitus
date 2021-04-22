const db = require("../services/postgres.service");

exports.checkUserWalletExistence = async (target) => {
    let walletCheck = db.query(
        'SELECT * FROM main.currency WHERE user_id = $1',
        [`${target.id}`]
    )
    return walletCheck
}

exports.createNewUserWallet = async (target) => {
    let newWalletResponse = db.query(
        'INSERT INTO main.currency (user_id, currency) VALUES ($1, $2) RETURNING *',
        [`${target.id}`, 0]
    )
    return newWalletResponse
}

exports.getCurrencyById = async (target) => {
    let getCurrencyResponse = db.query(
        'SELECT user_id, currency FROM main.currency WHERE user_id = $1',
        [target.id]
    )
    return getCurrencyResponse
}

exports.addCurrency = async (amount, target) => {
    let addCurrencyResponse = db.query(
        'UPDATE main.currency SET currency = currency + $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return addCurrencyResponse
}

exports.updateCurrency = async (amount, target) => {
    let updateCurrencyResponse = db.query(
        'UPDATE main.currency SET currency = $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return updateCurrencyResponse
}

exports.removeCurrency = async (amount, target) => {
    let removeCurrencyResponse = db.query(
        'UPDATE main.currency SET currency = currency - $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return removeCurrencyResponse
}
