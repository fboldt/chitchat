const sectionposts = document.querySelector('#sectionposts')

const displayCreatePost = () => {
    const token = localStorage.getItem('token')
    if (token) {
        const insertPost = document.createElement('form')
        sectionposts.prepend(insertPost)
        insertPost.innerHTML = `
                <textarea rows="6" cols="32" name="textContent"></textarea>
                <br> <input type="submit" value="send">`
        insertPost.addEventListener('submit', function (e) {
            e.preventDefault()
            const payload = new URLSearchParams(new FormData(this));
            sendPost(payload)
        })
    }
}

const sendPost = (payload) => {
    const token = localStorage.getItem('token')
    if (token) {
        fetch('post', {
            method: 'POST',
            body: payload,
            headers: { authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => displayNewPost(data))
    }
}

const displayNewPost = (data) => {
    const { post } = data
    if (post) {
        const divPosts = sectionposts.querySelector('div')
        divPosts.prepend(formatPost(data.post))
    }
}

const fetchPosts = () => {
    fetch('post')
        .then(res => res.json())
        .then(data => displayPosts(data.posts))
}

const displayPosts = (posts) => {
    const divPosts = document.createElement('div')
    sectionposts.appendChild(divPosts)
    for (const post of posts) {
        divPosts.appendChild(formatPost(post))
    }
}

const formatPost = (post) => {
    const fpost = document.createElement('p')
    fpost.innerHTML = `
        <b>${post.author}</b><br>
        <i>(${post.createdAt})</i><br>
        ${post.textContent}`
    const loggedUser = sectionlogin.querySelector('span')
    if (loggedUser && loggedUser.innerText == post.author) {
        fpost.innerHTML += `<span class="fa fa-trash-o" 
                            style="margin-left:1em" 
                            data-postid="${post._id}">
                            </span>`
        const buttonDelete = fpost.querySelector('span')
        buttonDeleteSetBehavior(buttonDelete)
    }
    return fpost
}

const buttonDeleteSetBehavior = (buttonDelete) => {
    buttonDelete.addEventListener('click', function (ev) {
        const postid = this.dataset.postid
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`post/${postid}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    const { success } = data
                    if (success) {
                        buttonDelete.parentNode.remove()
                    }
                })
        }
    })
}


displayCreatePost()
fetchPosts()
