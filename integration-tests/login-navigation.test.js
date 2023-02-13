import { expect, jest, test, beforeEach, afterEach } from '@jest/globals';

import portfinder from 'portfinder'
import puppeteer from 'puppeteer'
import app from '../index'

let server = null
let port = null

beforeAll(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterAll(() => {
    server.close()
})

test('link da página inicial para o formulário de login', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[href="/login"]'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/login`)
    await browser.close()
})

test('falha ao tentar logar', async () => {
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}/login`)
    await Promise.all([
        page.waitForSelector('input[name=email]'),
        page.$eval('input[name=email]', el => el.value = ''),
        page.waitForSelector('input[name=senha]'),
        page.$eval('input[name=senha]', el => el.value = ''),
        page.click('input[type="submit"]'),
        page.waitForSelector('h2')
    ])
    const title = await page.$('h2')
    const text = await page.evaluate(h2 => h2.textContent, title)
    expect(text).toBe("Falha no login")
    await browser.close()
})

test('login com sucesso', async () => {
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}/login`)
    await Promise.all([
        page.waitForSelector('input[name=email]'),
        page.$eval('input[name=email]', el => el.value = 'alice'),
        page.waitForSelector('input[name=senha]'),
        page.$eval('input[name=senha]', el => el.value = '123'),
        page.click('input[type="submit"]'),
        page.waitForSelector('h2')
    ])
    const title = await page.$('h2')
    const text = await page.evaluate(h2 => h2.textContent, title)
    expect(text).toBe("Login efetuado com sucesso")
    await browser.close()
})
