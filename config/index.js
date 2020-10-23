require('dotenv').config('./../.env')
const database = process.env.DATABASE
const host = process.env.HOST
const protocol = "mongodb"
const port = process.env.DBPORT

const config = {
    db: {
        protocol,
        host,
        port,
        database
    }
}

module.exports = config