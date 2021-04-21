const Pool = require("pg").Pool

const pool = new Pool({
    user: 'blue',
    host: 'petopia-1.cberdsmert7u.us-east-1.rds.amazonaws.com',
    database: 'larvitus',
    password: 'Canary1^',
    port: 5432,
})

module.exports = pool
