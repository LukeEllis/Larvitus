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
