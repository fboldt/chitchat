const sectionlogin = document.querySelector('#sectionlogin')

const checkLogin = async () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!username || !token) {
        displayFormLogin()
    } else {
        displayLinkLogout(username)
    }
}

const displayFormLogin = () => {
    sectionlogin.innerHTML = `
        <form>
            <input type="text" name="username" placeholder="username" size="6">
            <input type="password" name="password" placeholder="password" size="6">
            <button type="submit">login</button>
            <a href="#">sign in</a>
        </form>`
    const formlogin = sectionlogin.querySelector('form');
    formlogin.addEventListener('submit', function (e) {
        e.preventDefault()
        const payload = new URLSearchParams(new FormData(this));
        sendLogin(payload)
    })
    const linksignin = formlogin.querySelector('a')
    linksignin.addEventListener('click', function (e) {
        e.preventDefault()
        displayFormSignin()
    })
}

const sendLogin = (payload) => {
    fetch('login', {
        method: 'POST',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checkLogin()
        })
}

const displayFormSignin = () => {
    sectionlogin.innerHTML = `
        <form>
            <input type="text" name="username" placeholder="username" size="6">
            <input type="text" name="email" placeholder="email" size="6">
            <input type="password" name="password" placeholder="password" size="6">
            <button type="submit">sign in</button>
            <a href="#">cancel</a>
        </form>`
        const formsignin = sectionlogin.querySelector('form');
        formsignin.addEventListener('submit', function (e) {
            e.preventDefault()
            const payload = new URLSearchParams(new FormData(this));
            sendSignin(payload)
        })
        const linkcancel = formsignin.querySelector('a')
        linkcancel.addEventListener('click', function (e) {
            e.preventDefault()
            checkLogin()
        })
}

const sendSignin = (payload) => {
    fetch('user/signin', {
        method: 'POST',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checkLogin()
        })
}

const displayLinkLogout = (username) => {
    sectionlogin.innerHTML = `${username} <a href="#">logout</a>`
    const linklogout = sectionlogin.querySelector('a');
    linklogout.addEventListener('click', function (e) {
        e.preventDefault()
        sendLogout()
    })
}

const sendLogout = () => {
    fetch('login', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (!username || !token) {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
            }
            checkLogin()
        })
}

checkLogin()
