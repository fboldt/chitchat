const sectionquote = document.querySelector("#sectionquote")
const quote = document.createElement('p')
sectionquote.appendChild(quote)

const fetchQuote = () => {
    const token = localStorage.getItem('token')
    if (token) {
        fetch('quote', { headers: { authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => displayQuote(data))
    }
}

const displayQuote = (data) => {
    const { quoteText, quoteAuthor } = data
    if (quoteText) {
        quote.innerHTML = `${quoteText} <i>${quoteAuthor}</i>`
    }
}

fetchQuote()
