import { expect, test } from '@jest/globals';

import { insertUser, userExists, userCredentials, removeUser } from '../users.js'

const strangeUserName = "1029384756abcde1029384756abcde"
const somePassword = "123"

test('verifica se usuário não existe existe', async () => {
    const rows = await userExists(strangeUserName)
    expect(rows).toBe(false)
})

test('insere novo usuário', async () => {
    const rows = await insertUser(strangeUserName, somePassword)
    expect(rows).toStrictEqual([])
})

test('verifica se usuário existe', async () => {
    const rows = await userExists(strangeUserName)
    expect(rows).toBe(true)
})

test('verifica credenciais corretas', async () => {
    const rows = await userCredentials(strangeUserName, somePassword)
    expect(rows.email).toStrictEqual(strangeUserName)
    expect(rows.senha).toStrictEqual(somePassword)
})

test('verifica senha errada', async () => {
    const rows = await userCredentials(strangeUserName, somePassword+"1")
    expect(rows).toBe(false)
})

test('exclui usuário de teste', async () => {
    const rows = await removeUser(strangeUserName)
    expect(rows).toStrictEqual([])
})
