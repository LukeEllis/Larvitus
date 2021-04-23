const db = require("../services/postgres.service");

exports.createNewUserWallet = async (target) => {
    let newWalletResponse = await db.query(
        'INSERT INTO main.currency (user_id, user_name, currency) VALUES ($1, $2, $3) RETURNING *',
        [`${target.id}`, `${target.username}`, 0]
    )
    return newWalletResponse
}

exports.getCurrencyById = async (target) => {
    let getCurrencyResponse = await db.query(
        'SELECT user_id, currency FROM main.currency WHERE user_id = $1',
        [target.id]
    )
    return getCurrencyResponse
}

exports.addCurrency = async (amount, target) => {
    let addCurrencyResponse = await db.query(
        'UPDATE main.currency SET currency = currency + $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return addCurrencyResponse
}

exports.updateCurrency = async (amount, target) => {
    let updateCurrencyResponse = await db.query(
        'UPDATE main.currency SET currency = $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return updateCurrencyResponse
}

exports.removeCurrency = async (amount, target) => {
    let removeCurrencyResponse = await db.query(
        'UPDATE main.currency SET currency = currency - $1 WHERE user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return removeCurrencyResponse
}
