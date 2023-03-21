import { executeQuery } from "./connect.js"

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

async function createTablePosts() {
    const sql = `
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            author INTEGER REFERENCES users(id),
            text VARCHAR(256),
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `
    const rows = await executeQuery(sql)
    return rows
}

async function insertTestUser() {
    let query = `SELECT * FROM users WHERE email = 'test@email.com'`
    const rows = await executeQuery(query)
    if (rows.length > 0) return false
    query = `INSERT INTO users (email, senha) VALUES ($1, $2)`
    const values = ['test@email.com', '123']
    return await executeQuery(query, values)
}

async function init() {
    console.log(await executeQuery('SELECT NOW()'))
    console.log(await createTableUsers())
    try {
        console.log(await insertTestUser())
    } catch (err) {
        console.log(err)
    }
    console.log(await createTablePosts())
}

await init()
