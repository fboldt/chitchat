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
        res = await client.query(query, values)
    }
    const rows = res.rows
    if (process.env.NODE_ENV == "development") {
        console.log(query, ":", rows)
    }
    client.end()
    return rows
}

export { executeQuery }
