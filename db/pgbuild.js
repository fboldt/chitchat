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

async function init() {
    console.log(await executeQuery('SELECT NOW()'))
    console.log(await showTables())
    console.log(await createTableUsers())
    console.log(await showTables())
}

await init()
