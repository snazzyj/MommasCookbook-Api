require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.TEST_DATABASE_URL,
    "database" : "cookbook-api",
    "username" : "alex",
    "password": "1"
}