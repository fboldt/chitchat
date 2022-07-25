const section_login = document.querySelector('#section_login')
const formloginhtml = `
<form id="formloginhtml">
    <input type="text" name="username" id="input_username" placeholder="username" size="6">
    <input type="password" name="password" id="input_password" placeholder="password" size="6">
    <button type="submit">login</button>
</form>`
section_login.innerHTML = formloginhtml

const formlogin = document.querySelector('#formloginhtml');
formlogin.addEventListener('submit', function (e) {
    e.preventDefault()
    const payload = new URLSearchParams(new FormData(this));
    fetch('login', {
        method: 'POST',
        body: payload,
    })
    .then(res => res.json())
    .then(data => checklogin(data))
})

const checklogin = async (data) => {
    if (data.username != "") {
        section_login.innerHTML = `${data.username} <a href="login">logout</a>`
    } else {
        section_login.innerHTML = formloginhtml
    }
}
