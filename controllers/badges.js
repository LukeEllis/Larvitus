const db = require("../services/postgres.service");

exports.checkUserBadgesExistence = async (target) => {
    let badgeCheck = db.query(
        'SELECT * FROM main.badges WHERE user_id = $1',
        [`${target.id}`]
    )
    return badgeCheck
}

exports.getBadgesById = async (target) => {
    let getBadgesResponse = db.query(
        'SELECT * FROM main.badges WHERE user_id = $1',
        [`${target.id}`]
    )
    return getBadgesResponse
}

exports.checkBadge = async (target, badgeName) => {
    let checkBadgeResponse = db.query(
        'SELECT * FROM main.badges WHERE user_id = $1 AND badge_name = $2',
        [`${target.id}`, `${badgeName}`]
    )
    return checkBadgeResponse
}

exports.addBadges = async (target, badgeCategory, badgeName) => {
    let addBadgesResponse = db.query(
        'INSERT INTO main.badges (user_id, user_name, badge_category, badge_name, earned_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [`${target.id}`, `${target.tag}`, `${badgeCategory}`, `${badgeName}`, new Date()]
    )
    return addBadgesResponse
}

exports.removeBadges = async (target, badgeName) => {
    let removeBadgesResponse = db.query(
        'DELETE FROM main.badges WHERE user_id = $1 AND badge_category = $2 AND badge_name = $3 RETURNING *',
        [`${target.id}`, `${badgeCategory}`, `${badgeName}`]
    )
    return removeBadgesResponse
}

exports.formatBadgeCategories = async (getBadges) => {
    if(getBadges.rows[i-1].badge_category === 'shiny_gym'){
        let category = 'Shiny Gym';
        return category
    }else if(getBadges.rows[i-1].badge_category === 'showdown_gym'){
        let category = 'Showdown Gym';
        return category
    }else if(getBadges.rows[i-1].badge_category === 'art'){
        let category = 'Art';
        return category
    }else if(getBadges.rows[i-1].badge_category === 'baking'){
        let category = 'Baking';
        return category
    }
}

exports.formatBadgeNames = async (getBadges) => {
    if(getBadges.rows[i-1].badge_name === 'blazing_blaziken_badge'){
        let category = 'Blazing Blaziken Badge';
        return category
    }else if(getBadges.rows[i-1].badge_name === 'tyrannus_badge'){
        let category = 'Tyrannus Badge';
        return category
    }else if(getBadges.rows[i-1].badge_name === 'rockin_out_badge'){
        let category = `Rockin' Out Badge`;
        return category
    }else if(getBadges.rows[i-1].badge_name === 'art_1_badge'){
        let category = 'Art Badge 1';
        return category
    }else if(getBadges.rows[i-1].badge_name === 'baking_1_badge'){
        let category = 'Baking Badge 1';
        return category
    }
}
