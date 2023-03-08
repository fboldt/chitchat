import dotenv from 'dotenv'
dotenv.config()
import pgpkg from 'pg';
const { Client } = pgpkg;

function getClient() {
    let client
    if (process.env.NODE_ENV == "development") {
        client = new Client()
    } else {
        client = new Client({ "connectionString": `${process.env.PG_CONNECTION_STRING}` })
    }
    return client
}

async function executeQuery(query, values = null) {
    const client = getClient()
    await client.connect()
    let res
    if (values == null) {
        res = await client.query(query)
    } else {
        res = await client.query(query, [email, senha])
    }
    const rows = res.rows
    console.log(rows)
    return rows
}

async function insertUser(email, senha) {
    const query = `INSERT INTO users (email, senha) VALUES ($1, $2)`
    const values = [email, senha]
    return await executeQuery(query, values)
}

async function checkUser(email) {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    return await executeQuery(query)
}

async function checkCredentials(email, senha) {
    const query = `SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`
    return await executeQuery(query)
}
