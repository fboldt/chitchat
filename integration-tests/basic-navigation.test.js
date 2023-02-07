import { expect, jest, test, beforeEach, afterEach } from '@jest/globals';

import portfinder from 'portfinder'
import puppeteer from 'puppeteer'
import app from '../index'

let server = null
let port = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('link da página inicial para a página sobre', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="sobre"'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/sobre`)
    await browser.close()
})


test('link da página inicial para o formulário de login', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="login"'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/login`)
    await browser.close()
})
