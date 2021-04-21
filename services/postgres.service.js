const Pool = require("pg").Pool
const { db_user, db_host, db_database, db_password, db_port } = require('../config.json');

const pool = new Pool({
    user: db_user,
    host: db_host,
    database: db_database,
    password: db_password,
    port: db_port,
})

module.exports = pool
