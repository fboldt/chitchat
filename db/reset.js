import { executeQuery } from "./connect.js"

async function dropTableUsers() {
    const sql = `DROP TABLE users`
    const rows = await executeQuery(sql)
    return rows
}

async function dropTablePosts() {
    const sql = `DROP TABLE posts`
    const rows = await executeQuery(sql)
    return rows
}

async function resetDatabase() {
    console.log(await dropTablePosts())
    console.log(await dropTableUsers())
}

await resetDatabase()
