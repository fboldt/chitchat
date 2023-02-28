import { expect, test } from '@jest/globals';

import portfinder from 'portfinder'
import puppeteer from 'puppeteer'
import app from '../index'

let server = null
let port = null
let browser = null

beforeAll(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
    browser = await puppeteer.launch()
})

afterAll(async () => {
    await browser.close()
    server.close()
})

test('link da página inicial para o formulário de login', async () => {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await page.click('[href="/login"]')
    expect(page.url()).toBe(`http://localhost:${port}/login`)
    await page.close()
})
test('falha ao tentar logar', async () => {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}/login`)
    await page.$eval('input[name=email]', el => el.value = '')
    await page.$eval('input[name=senha]', el => el.value = '')
    await page.click('input[type="submit"]')    
    const title = await page.$('h2')
    const text = await page.evaluate(h2 => h2.textContent, title)
    expect(text).toBe("Falha no login")
    await page.close()
})

test('login com sucesso', async () => {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}/login`)
    await page.$eval('input[name=email]', el => el.value = 'a@s')
    await page.$eval('input[name=senha]', el => el.value = '1')
    await page.click('input[type="submit"]')
    const title = await page.$('h2')
    const text = await page.evaluate(h2 => h2.textContent, title)
    expect(text).toBe("Login efetuado com sucesso")
    await page.close()
})
