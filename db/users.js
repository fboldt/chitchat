import { executeQuery } from "./postgres.js"

async function insertUser(email, senha) {
    const query = `INSERT INTO users (email, senha) VALUES ($1, $2)`
    const values = [email, senha]
    return await executeQuery(query, values)
}

async function userExists(email) {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    const rows = await executeQuery(query)
    return rows.length > 0
}

async function userCredentials(email, senha) {
    const query = `SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`
    const rows = await executeQuery(query)
    if (rows.length == 0) return false
    return rows[0]
}

async function removeUser(email) {
    const query = `DELETE FROM users WHERE email = '${email}'`
    return await executeQuery(query)
}

console.log(await insertUser("alice", "123"))
console.log(await userExists("alice"))
console.log(await userCredentials("alice", "123"))
console.log(await removeUser("alice"))

export { insertUser, userExists, userCredentials, removeUser }
