const db = require("../services/postgres.service");

exports.getInventoryById = async (target) => {
    let getInventoryResponse = await db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1',
        [`${target.id}`]
    )
    return getInventoryResponse
}

exports.itemCheck = async (target, itemName) => {
    let itemCheckResponse = await db.query(
        'SELECT * from main.inventory WHERE user_id = $1 AND item_name = $2',
        [`${target.id}`, `${itemName}`]
    )
    return itemCheckResponse
}

exports.createItemEntry = async (target, itemName, amount) => {
    let getItemCategories = await db.query(
        'SELECT item_category FROM main.shop WHERE item_name = $1',
        [`${itemName}`]
    )
    let createItemEntryResponse = await db.query(
        'INSERT INTO main.inventory (user_id, user_name, item_category, item_name, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [`${target.id}`, `${target.username}`, `${getItemCategories.rows[0].item_category}`, `${itemName}`, `${amount}`]
    )
    return createItemEntryResponse
}

exports.addToInventory = async (target, itemName, amount) => {
    let addToInventoryResponse = await db.query(
        'UPDATE main.inventory SET amount = amount + $1 WHERE user_id = $2 AND item_name = $3 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemName}`]
    )
    return addToInventoryResponse
}

exports.removeFromInventory = async (target, itemName, amount) => {
    let removeFromInventoryResponse = await db.query(
        'UPDATE main.inventory SET amount = amount - $1 WHERE user_id = $2 AND item_name = $3 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemName}`]
    )
    return removeFromInventoryResponse
}

exports.clearInventory = async (target, itemName) => {
    let clearInventoryResponse = await db.query(
        'UPDATE main.inventory SET amount = $1 WHERE user_id = $2 AND item_name = $3 RETURNING *',
        [0, `${target.id}`, `${itemName}`]
    )
    return clearInventoryResponse
}
