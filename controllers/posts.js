import { getPost, insertPost as dbInsertPost, listPosts as dbListPosts, deletePost as dbDeletePost } from '../db/posts.js'

async function insertPost(email, text) {
    return await dbInsertPost(email, text)
}

async function listPosts() {
    const posts = await dbListPosts()
    return posts
}

async function deletePost(user, id) {
    const { email } = await getPost(id)
    if (email == user) {
        return await dbDeletePost(id)
    }
    return null
}

export { listPosts, insertPost, deletePost }
