import { readFileSync, writeFileSync } from 'fs'

const filePath = 'db/users.json'

function isUserInArray(users, email) {
    return users.some(item => item["email"] == email)
}

function checkUser(email) {
    const data = readFileSync(filePath)
    const users = JSON.parse(data)
    return isUserInArray(users, email)
}

function saveUser(email, senha) {
    const data = readFileSync(filePath)
    const users = JSON.parse(data)
    if (isUserInArray(users, email)) return false
    users.push({ email, senha })
    writeFileSync(filePath, JSON.stringify(users))
    return true
}

export { saveUser, checkUser }
