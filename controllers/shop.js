const db = require("../services/postgres.service");

exports.getShop = async () => {
    let getShopResponse = await db.query(
        'SELECT * FROM main.shop WHERE purchasable = true ORDER BY item_category ASC'
    )
    return getShopResponse
}

// Maybe keep for later?
exports.getAllItemsWithPower = async () => {
    let getAllItemsWithPowerResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_power > 0'
    )
    return getAllItemsWithPowerResponse
}

exports.getShopByCategory = async (itemCategory) => {
    let getShopByCategoryResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_category = $1 AND purchasable = true ORDER BY cost DESC',
        [`${itemCategory}`]
    )
    return getShopByCategoryResponse
}

exports.getShopByItemName = async (itemName) => {
    let getShopByItemNameResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_name = $1 AND purchasable = true',
        [`${itemName}`]
    )
    return getShopByItemNameResponse
}

exports.getRareItemsByItemName = async (itemName) => {
    let getRareItemsByItemNameResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_name = $1 AND purchasable = false',
        [`${itemName}`]
    )
    return getRareItemsByItemNameResponse
}

exports.getAllItemsByItemName = async (itemName) => {
    let getAllItemsByItemNameResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_name = $1',
        [`${itemName}`]
    )
    return getAllItemsByItemNameResponse
}

exports.itemLimitCheck = async (itemName) => {
    let itemLimitCheckResponse = await db.query(
        'SELECT item_limit FROM main.shop WHERE item_name = $1',
        [`${itemName}`]
    )
    return itemLimitCheckResponse
}

// Maybe keep for later?
exports.filterItemsWithNoPower = async (itemCategory) => {
    let filterItemsWithNoPowerResponse = await db.query(
        'SELECT * from main.shop WHERE item_category = $1 AND item_power > 0',
        [`${itemCategory}`]
    )
    return filterItemsWithNoPowerResponse
}
