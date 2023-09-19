const {Client} = require('pg')

const client = new Client ({
    host : "localhost",
    user: "postgres",
    port: 5432,
    password: "mukti",
    database: "crudapp"
})

module.exports = client