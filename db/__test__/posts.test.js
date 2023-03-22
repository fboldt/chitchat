import { expect, test } from '@jest/globals';

import { insertPost, listPosts, deletePost } from '../posts.js';

test('insere novo post', async () => {
    const rows = await insertPost("test@email.com", "test text")
    expect(rows).toStrictEqual([])
})

test('lista posts', async () => {
    const rows = await listPosts()
    expect(rows.length).toBeGreaterThanOrEqual(1)
})

test('exclui post', async () => {
    let rows = await listPosts()
    const lastPostId = rows[0].id
    rows = await deletePost(lastPostId)
    expect(rows).toStrictEqual([])
})
