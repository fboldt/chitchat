import dotenv from 'dotenv'
dotenv.config()
import pgpkg from 'pg';
const { Client } = pgpkg;

let client
if (process.env.NODE_ENV == "development") {
    client = new Client()
} else {
    client = new Client({ "connectionString": `${process.env.PG_CONNECTION_STRING}` })
}

async function now() {
    const { rows } = await client.query('SELECT NOW()')
    console.log(rows)
    return rows
}

async function createTableUsers() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            email varchar(64) NOT NULL,
            senha varchar(256) NOT NULL UNIQUE
        )
    `
    const { rows } = await client.query(sql)
    console.log(rows)
    return rows
}

async function init() {
    await now()
    await createTableUsers()
}

client.connect().then(async () => {
    try {
        await init()
    } catch (err) {
        console.log('ERROR: could not initialize database')
        console.log(err.message)
    } finally {
        client.end()
    }
})
