const db = require("../services/postgres.service");

exports.getCurrencyById = async (target) => {
    let getCurrencyResponse = await db.query(
        'SELECT * FROM stc.currency WHERE discord_user_id = $1',
        [target.id]
    )
    return getCurrencyResponse
}

exports.addCurrency = async (amount, target) => {
    let addCurrencyResponse = await db.query(
        'UPDATE stc.currency SET currency = currency + $1 WHERE discord_user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return addCurrencyResponse
}

exports.updateCurrency = async (amount, target) => {
    let updateCurrencyResponse = await db.query(
        'UPDATE stc.currency SET currency = $1 WHERE discord_user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return updateCurrencyResponse
}

exports.removeCurrency = async (amount, target) => {
    let removeCurrencyResponse = await db.query(
        'UPDATE stc.currency SET currency = currency - $1 WHERE discord_user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return removeCurrencyResponse
}

exports.createUserProfile = async (target) => {
    let createUserProfileResponse = await db.query(
        'INSERT INTO stc.currency (discord_user_id, username, total_points, current_points) VALUES ($1, $2, $3, $4) RETURNING *',
        [`${target.id}`, `${target.username}`, 0, 0]
    )
    return createUserProfileResponse
}

exports.canUserAfford = async (balance, cost, validItemName) => {
    console.log(`balance`, balance.rows[0].current_points)
    console.log(`cost`, cost)
    if (balance.rows[0].current_points < cost){
        return message.channel.send(`You cannot afford ${validItemName.rows[0].reward_name} right now. Keep saving up points!`);
    }
}
