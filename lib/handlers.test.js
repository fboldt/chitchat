import handlers from "./handlers.js";
import { expect, jest, test } from '@jest/globals';

test('rederizador da página inicial', async () => {
    const req = {}
    const res = { render: jest.fn() }
    await handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('home')
    expect(res.render.mock.calls[0][1])
        .toEqual(expect.objectContaining({
            quote: expect.objectContaining({
                author: expect.stringMatching(/.*/),
                text: expect.stringMatching(/\W/),
            })
        }))
})

test('renderizadores da página sobre', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.sobre(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('sobre')
})

test('404 handler renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('500 handler renders', () => {
    const err = new Error('some error')
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    handlers.serverError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})
