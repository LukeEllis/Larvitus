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

exports.itemAmountCheck = async (target, itemCategory, itemName) => {
    let itemAmountCheckResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1 AND item_category = $2 AND item_name = $3',
        [`${target.id}`, `${itemCategory}`, `${itemName}`]
    )
    return itemAmountCheckResponse
}

exports.itemAmountCheckAuthor = async (author, itemName) => {
    let itemAmountCheckAuthorResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1 AND item_name = $2',
        [`${author.id}`, `${itemName}`]
    )
    return itemAmountCheckAuthorResponse
}

exports.itemAmountCheckTarget = async (target, itemName) => {
    let itemAmountCheckTargetResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1 AND item_name = $2',
        [`${target.id}`, `${itemName}`]
    )
    return itemAmountCheckTargetResponse
}

exports.addItemToAuthor = async (amount, author, itemName) => {
    let addItemToAuthorResponse = db.query(
        'UPDATE main.inventory SET amount = amount + $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [`${amount}`, `${author.id}`, `${itemName}`]
    )
    return addItemToAuthorResponse
}

exports.addItemToTarget = async (amount, target, itemName) => {
    let addItemToTargetResponse = db.query(
        'UPDATE main.inventory SET amount = amount + $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemName}`]
    )
    return addItemToTargetResponse
}

exports.removeAllOfOneItemFromAuthor = async (author, itemName) => {
    let removeAllOfOneItemFromAuthorResponse = db.query(
        'UPDATE main.inventory SET amount = $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [0, `${author.id}`, `${itemName}`]
    )
    return removeAllOfOneItemFromAuthorResponse
}

exports.removeAllOfOneItemFromTarget = async (target, itemName) => {
    let removeAllOfOneItemFromTargetResponse = db.query(
        'UPDATE main.inventory SET amount = $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [0, `${target.id}`, `${itemName}`]
    )
    return removeAllOfOneItemFromTargetResponse
}

exports.removeItemsFromAuthor = async (amount, author, itemName) => {
    let removeItemsFromAuthorResponse = db.query(
        'UPDATE main.inventory SET amount = amount - $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [`${amount}`, `${author.id}`, `${itemName}`]
    )
    return removeItemsFromAuthorResponse
}

exports.removeItemsFromTarget = async (amount, target, itemName) => {
    let removeItemsFromTargetResponse = db.query(
        'UPDATE main.inventory SET amount = amount - $1 WHERE user_id = $2 item_name = $3 RETURNING *',
        [`${amount}`, `${target.id}`, `${itemName}`]
    )
    return removeItemsFromTargetResponse
}
