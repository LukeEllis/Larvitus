const db = require("../services/postgres.service");

exports.getDragonslayer = async () => {
    let getDragonslayerResponse = await db.query(
        'SELECT * FROM games.dragonslayer'
    )
    return getDragonslayerResponse
}

exports.addToDragonslayerHoard = async (amount) => {
    let addToDragonslayerHoardResponse = await db.query(
        'UPDATE games.dragonslayer SET hoard = hoard + $1 RETURNING *',
        [`${amount}`]
    )
    return addToDragonslayerHoardResponse
}

exports.updateDragonslayerHoard = async (amount) => {
    let updateDragonslayerHoardResponse = await db.query(
        'UPDATE games.dragonslayer SET hoard = $1 RETURNING *',
        [`${amount}`]
    )
    return updateDragonslayerHoardResponse
}

exports.removeFromDragonslayerHoard = async (amount) => {
    let removeFromDragonslayerHoardResponse = await db.query(
        'UPDATE games.dragonslayer SET hoard = hoard - $1 RETURNING *',
        [`${amount}`]
    )
    return removeFromDragonslayerHoardResponse
}

exports.createDragonslayerCache = async () => {

    const cacheRollOne = Math.ceil(Math.random() * 3);
    const cacheRollTwo = Math.ceil(Math.random() * 3);
    const cacheRollThree = Math.ceil(Math.random() * 3);

    let createDragonslayerCacheResponse = await db.query(
        'UPDATE games.dragonslayer SET cache_item_1_amount = $1, cache_item_2_amount = $2, cache_item_3_amount = $3 RETURNING *',
        [`${cacheRollOne}`, `${cacheRollTwo}`, `${cacheRollThree}`]
    )

    return createDragonslayerCacheResponse

}

exports.emptyDragonslayerCache = async () => {
    let emptyDragonslayerCacheResponse = await db.query(
        'UPDATE games.dragonslayer SET cache_item_1_amount = 0, cache_item_2_amount = 0, cache_item_3_amount = 0 RETURNING *'
    )
    return emptyDragonslayerCacheResponse
}

exports.getRandomDragonslayerItem = async () => {

    let getRareDragonslayerItems = await db.query(
        'SELECT * FROM main.shop WHERE item_category = $1 AND purchasable = $2',
        ['dragonslayer', false]
    )

    let roll = Math.floor(Math.random() * (parseInt(getRareDragonslayerItems.rows.length)));
    let getRandomDragonslayerItemResponse = getRareDragonslayerItems.rows[roll].item_name;
    return getRandomDragonslayerItemResponse

}

exports.getInventoryOfItemsWithPower = async (target, itemCategory) => {
    let getInventoryOfItemsWithPowerResponse = await db.query(
        'SELECT * FROM games.inventory_of_items_with_power WHERE user_id = $1 AND item_category = $2',
        [`${target.id}`, `${itemCategory}`]
    )
    return getInventoryOfItemsWithPowerResponse
}
