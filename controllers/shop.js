const db = require("../services/postgres.service");

exports.getShop = async () => {
    let getShopResponse = await db.query(
        'SELECT * FROM stc.redeems ORDER BY reward_type ASC'
    )
    return getShopResponse
}

exports.itemLimitCheck = async (itemName) => {
    let itemLimitCheckResponse = await db.query(
        'SELECT reward_limit FROM stc.redeems WHERE reward_name = $1',
        [`${itemName}`]
    )
    return itemLimitCheckResponse
}

exports.getShopByItemName = async (itemName) => {
    let getShopByItemNameResponse = await db.query(
        'SELECT * FROM stc.redeems WHERE reward_name = $1',
        [`${itemName}`]
    )
    return getShopByItemNameResponse
}
