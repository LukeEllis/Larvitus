const db = require("../services/postgres.service");

exports.checkUserInventoryExistence = async (target) => {
    let inventoryCheck = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1',
        [`${target.id}`]
    )
    return inventoryCheck
}

exports.createNewUserInventory = async (target) => {
    let newInventoryResponse = db.query(
        'INSERT INTO main.inventory (user_id, shiny_gym_badge_1_blazing_blaziken_badge, shiny_gym_badge_2_tyrannus_badge, showdown_gym_badge_1_rockin_out, community_art_badge_1, community_baking_badge_1) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [`${target.id}`, 0, 0, 0, 0, 0]
    )
    return newInventoryResponse
}

exports.getInventoryById = async (target) => {
    let getInventoryResponse = db.query(
        'SELECT * FROM main.inventory WHERE user_id = $1',
        [`${target.id}`]
    )
    return getInventoryResponse
}
