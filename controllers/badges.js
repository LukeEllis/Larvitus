const db = require("../services/postgres.service");

exports.getBadgesById = async (target) => {
    let getBadgesResponse = await db.query(
        'SELECT * FROM main.badges WHERE user_id = $1',
        [`${target.id}`]
    )
    return getBadgesResponse
}

exports.checkBadge = async (target, badgeName) => {
    let checkBadgeResponse = await db.query(
        'SELECT * FROM main.badges WHERE user_id = $1 AND badge_name = $2',
        [`${target.id}`, `${badgeName}`]
    )
    return checkBadgeResponse
}

exports.addBadges = async (target, badgeName) => {
    let getBadgeCategories = await db.query(
        'SELECT badge_category FROM main.badge_case WHERE item_name = $1',
        [`${badgeName}`]
    )
    let addBadgesResponse = await db.query(
        'INSERT INTO main.badges (user_id, user_name, badge_category, badge_name, earned_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [`${target.id}`, `${target.username}`, `${getBadgeCategories.rows[0].badge_category}`, `${badgeName}`, new Date()]
    )
    return addBadgesResponse
}

exports.removeBadges = async (target, badgeName) => {
    let removeBadgesResponse = await db.query(
        'DELETE FROM main.badges WHERE user_id = $1 AND badge_name = $2 RETURNING *',
        [`${target.id}`, `${badgeName}`]
    )
    return removeBadgesResponse
}

exports.getBadgeByBadgeName = async (badgeName) => {
    let getBadgeByBadgeNameResponse = await db.query(
        'SELECT * FROM main.badge_case WHERE badge_name = $1',
        [`${badgeName}`]
    )
    return getBadgeByBadgeNameResponse
}
