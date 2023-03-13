import { insertUser, userExists, userCredentials } from '../db/users.js'

async function checkUser(email) {
    return await userExists(email)
}

async function saveUser(email, senha) {
    if (await checkUser(email)) return false
    await insertUser(email, senha)
    return true
}

async function checkCredentials(email, senha) {
    const user = await userCredentials(email, senha)
    if (!user) return false
    return user.email == email
}

export { saveUser, checkUser, checkCredentials }
