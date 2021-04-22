const db = require("../services/postgres.service");

exports.checkUserInventoryExistence = async (target) => {
    let inventoryCheck = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1',
        [`${target.id}`]
    )
    return inventoryCheck
}

exports.getInventoryById = async (target) => {
    let getInventoryResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1',
        [`${target.id}`]
    )
    return getInventoryResponse
}

exports.itemCheck = async (target, itemCategory, itemName) => {
    let itemCheckResponse = db.query(
        'SELECT * from main.inventory WHERE user_id = $1 AND item_category = $2 AND item_name = $3',
        [`${target.id}`, `${itemCategory}`, `${itemName}`]
    )
    return itemCheckResponse
}

exports.createItemEntry = async (target, itemCategory, itemName, amount) => {
    let createItemEntryResponse = db.query(
        'INSERT INTO main.inventory (user_id, user_name, item_category, item_name, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [`${target.id}`, `${target.tag}`, `${itemCategory}`, `${itemName}`, `${amount}`]
    )
    return createItemEntryResponse
}

exports.addToInventory = async (target, itemCategory, itemName, amount) => {
    let addToInventoryResponse = db.query(
        'UPDATE main.inventory SET amount = amount + $1 WHERE user_id = $2 AND item_category = $3 AND item_name = $4 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemCategory}`, `${itemName}`]
    )
    return addToInventoryResponse
}

exports.removeFromInventory = async (target,  itemCategory, itemName, amount) => {
    let removeFromInventoryResponse = db.query(
        'UPDATE main.inventory SET amount = amount - $1 WHERE user_id = $2 AND item_category = $3 AND item_name = $4 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemCategory}`, `${itemName}`]
    )
    return removeFromInventoryResponse
}

exports.itemAmountCheck = async (target,  itemCategory, itemName) => {
    let itemAmountCheckResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1 AND item_category = $2 AND item_name = $3',
        [`${target.id}`, `${itemCategory}`, `${itemName}`]
    )
    return itemAmountCheckResponse
}
