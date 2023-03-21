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
    await page.$eval('input[name=email]', el => el.value = 'test@email.com')
    await page.$eval('input[name=senha]', el => el.value = '')
    await page.click('input[type="submit"]')   
    await page.waitForSelector('h2') 
    const title = await page.$('h2')
    const text = await page.evaluate(h2 => h2.textContent, title)
    expect(text).toBe("Falha no login!")
    await page.close()
})

test('login com sucesso', async () => {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}/login`)
    await page.$eval('input[name=email]', el => el.value = 'test@email.com')
    await page.$eval('input[name=senha]', el => el.value = '123')
    await page.click('input[type="submit"]')
    await page.waitForSelector('#userdisplay')
    const userdisplay = await page.$('#userdisplay')
    const text = await page.evaluate(p => p.textContent, userdisplay)
    expect(text).toBe("test@email.com sair")
    await page.close()
})
