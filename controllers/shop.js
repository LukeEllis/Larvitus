const db = require("../services/postgres.service");

exports.getShop = async () => {
    let getShopResponse = await db.query(
        'SELECT * FROM main.shop WHERE purchasable = true ORDER BY item_category ASC'
    )
    return getShopResponse
}

exports.getShopByCategory = async (category) => {
    let getShopByCategoryResponse = await db.query(
        'SELECT * FROM main.shop WHERE item_category = $1 AND purchasable = true ORDER BY cost DESC',
        [`${category}`]
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

exports.itemLimitCheck = async (itemName) => {
    let itemLimitCheckResponse = await db.query(
        'SELECT item_limit FROM main.shop WHERE item_name = $1',
        [`${itemName}`]
    )
    return itemLimitCheckResponse
}
