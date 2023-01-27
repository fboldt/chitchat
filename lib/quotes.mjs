import { readFile } from "fs"

function getQuote(callback) {
    readFile("db/quotes.json", "utf-8", (err, data) => {
        let quotesArray, idx
        if (err) {
            callback(err)
        }
        try {
            quotesArray = JSON.parse(data)
            idx = Math.floor(Math.random() * quotesArray.length)
        } catch (error) {
            return callback(err)
        }
        callback(null, quotesArray[idx])
    })
}

export { getQuote }
