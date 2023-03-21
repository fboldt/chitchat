import { executeQuery } from "./connect.js"

async function insertPost(authorEmail, text) {
    let query = `SELECT id FROM users WHERE email = '${authorEmail}'`
    const rows = await executeQuery(query)
    if (rows.length != 1) return false
    const authorId = rows[0].id
    const values = [authorId, text]
    query = `INSERT INTO posts (author, text) VALUES ($1, $2)`
    return await executeQuery(query, values)
}

async function listPosts() {
    const query = `SELECT posts.id, users.email, posts.text, posts.created_at 
        FROM posts INNER JOIN users ON posts.author=users.id ORDER BY posts.created_at DESC`
    return await executeQuery(query)
}

async function deletePost(id) {
    const query = `DELETE FROM posts WHERE id = '${id}'`
    return await executeQuery(query)
}

export { insertPost, listPosts, deletePost }
