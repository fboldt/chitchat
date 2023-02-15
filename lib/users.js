import { readFile, writeFile } from 'fs'

function saveUser(email, senha) {
    const filePath = 'db/users.json'
    readFile(filePath, (err, data) => {
        const users = JSON.parse(data)
        if (err) console.log(err);
        users.push({ email, senha })
        writeFile(filePath, JSON.stringify(users), (err) => {
            if (err) console.log(err)
        })
    })
}

export { saveUser }
