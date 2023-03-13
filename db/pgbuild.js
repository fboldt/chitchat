import { executeQuery } from "./postgres.js"

async function showTables() {
    return await executeQuery(`SELECT  * FROM information_schema.tables;`)
}

async function createTableUsers() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            email varchar(64) NOT NULL UNIQUE,
            senha varchar(256) NOT NULL
        )
    `
    const rows = await executeQuery(sql)
    return rows
}

async function insertTestUser() {
    const query = `INSERT INTO users (email, senha) VALUES ($1, $2)`
    const values = ['test@email.com', '123']
    return await executeQuery(query, values)
}

async function init() {
    console.log(await executeQuery('SELECT NOW()'))
    console.log(await createTableUsers())
    console.log(await insertTestUser())
}

await init()
