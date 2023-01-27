import { readFileSync } from "fs"

function getQuote() {
    const quotesArray = JSON.parse(readFileSync("db/quotes.json", "utf-8"))
    const idx = Math.floor(Math.random() * quotesArray.length)
    return quotesArray[idx]
}

export { getQuote }
