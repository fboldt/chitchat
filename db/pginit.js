import { executeQuery } from "./postgres.js"

async function now() {
    const rows = await executeQuery('SELECT NOW()')
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
    const rows = await executeQuery(sql)
    return rows
}

async function init() {
    console.log(await now())
    console.log(await createTableUsers())
}

await init()
