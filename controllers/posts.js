import { insertPost as dbInsertPost, listPosts as dbListPosts, deletePost } from '../db/posts.js'

async function insertPost(email, text) {
    return await dbInsertPost(email, text)
}

async function listPosts() {
    const posts = await dbListPosts()
    return posts
}

export { listPosts, insertPost }
