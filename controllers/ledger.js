const db = require("../services/postgres.service");

exports.getLedger = async (target) => {
    let getLedgerResponse = db.query(
        'SELECT * FROM main.ledger WHERE user_id = $1',
        [`${target.id}`]
    )
    return getLedgerResponse
}

exports.updateLedger = async (target, action, amount, author) => {
    let updateLedgerResponse = db.query(
        'INSERT INTO main.ledger (user_id, user_name, transaction, amount, transaction_owner_id, transaction_owner, transaction_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [`${target.id}`, `${target.tag}`, `${action}`, `${amount}`, `${author.id}`, `${author.tag}`, new Date()]
    )
    return updateLedgerResponse
}
