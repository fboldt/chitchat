import dotenv from 'dotenv'
dotenv.config()
import pgpkg from 'pg';
const { Pool, Client } = pgpkg;

let client
if (process.env.NODE_ENV == "development") {
    client = new Client()
} else {
    client = new Client({ "connectionString": `${process.env.PG_CONNECTION_STRING}` })
}

async function now() {
    const res = await client.query('SELECT NOW()')
    console.log(res.rows)
    return res
}

async function init() {
    await now()
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
