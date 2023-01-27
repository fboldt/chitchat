import { readFile, readFileSync } from "fs"

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

function getQuoteSync() {
    const quotesArray = JSON.parse(readFileSync("db/quotes.json", "utf-8"))
    const idx = Math.floor(Math.random() * quotesArray.length)
    return quotesArray[idx]
}

export { getQuote, getQuoteSync }
