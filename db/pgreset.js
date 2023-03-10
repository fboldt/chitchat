import { executeQuery } from "./postgres.js"

async function dropTableUsers() {
    const sql = `DROP TABLE users`
    const rows = await executeQuery(sql)
    return rows
}

async function resetDatabase() {
    console.log(await dropTableUsers())
}

await resetDatabase()
