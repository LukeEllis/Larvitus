const db = require("../services/postgres.service");

exports.getLeaderboard = async (target) => {
    let getLeaderboardResponse = await db.query(
        'SELECT * FROM stc.currency ORDER BY total_points DESC LIMIT 10'
    )
    return getLeaderboardResponse
}

exports.getCurrencyById = async (target) => {
    let getCurrencyResponse = await db.query(
        'SELECT * FROM stc.currency WHERE discord_user_id = $1',
        [target.id]
    )
    return getCurrencyResponse
}

exports.addCurrency = async (amount, target) => {
    let addCurrencyResponse = await db.query(
        'UPDATE stc.currency SET total_points = total_points + $1, current_points = current_points + $1 WHERE discord_user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return addCurrencyResponse
}

exports.updateCurrency = async (amount, target) => {
    let updateCurrencyResponse = await db.query(
        'UPDATE stc.currency SET current_points = $1 WHERE discord_user_id = $2 RETURNING *',
        [`${amount}`, `${target.id}`]
    )
    return updateCurrencyResponse
}

exports.removeCurrency = async (amount, target) => {
    let removeCurrencyResponse = await db.query(
        'UPDATE stc.currency SET current_points = current_points - $1 WHERE discord_user_id = $2 RETURNING *',
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
