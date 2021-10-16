const db = require("../services/postgres.service");

exports.getInventoryById = async (target) => {
    let getInventoryResponse = await db.query(
        'SELECT a.reward_name, a.reward_type, a.reward_point_cost, b.amount FROM stc.rewards a, stc.redeems b WHERE a.reward_id = b.reward_id AND b.discord_user_id = $1',
        [`${target.id}`]
    )
    return getInventoryResponse
}

exports.getItemCategories = async (itemName) => {
    let getItemCategoriesResponse = await db.query(
        'SELECT * FROM stc.rewards WHERE reward_name = $1',
        [`${itemName}`]
    )
    return getItemCategoriesResponse
}

exports.itemCheck = async (target, itemName) => {
    let getItemCategories = await db.query(
        'SELECT * FROM stc.rewards WHERE reward_name = $1',
        [`${itemName}`]
    )
    let itemCheckResponse = await db.query(
        'SELECT * from stc.redeems WHERE discord_user_id = $1 AND reward_id = $2',
        [`${target.id}`, `${getItemCategories.rows[0].reward_id}`]
    )
    return itemCheckResponse
}

exports.createItemEntry = async (target, itemName) => {
    let getItemCategories = await db.query(
        'SELECT * FROM stc.rewards WHERE reward_name = $1',
        [`${itemName}`]
    )
    let createItemEntryResponse = await db.query(
        'INSERT INTO stc.redeems (discord_user_id, reward_id, amount) VALUES ($1, $2, $3) RETURNING *',
        [`${target.id}`, `${getItemCategories.rows[0].reward_id}`, 0]
    )
    return createItemEntryResponse
}

exports.addToInventory = async (target, itemName, amount) => {
    let getItemCategories = await db.query(
        'SELECT * FROM stc.rewards WHERE reward_name = $1',
        [`${itemName}`]
    )
    let addToInventoryResponse = await db.query(
        'UPDATE stc.redeems SET amount = amount + $1 WHERE discord_user_id = $2 AND reward_id = $3 RETURNING *',
        [`${amount}`, `${target.id}`, `${getItemCategories.rows[0].reward_id}`]
    )
    return addToInventoryResponse
}
