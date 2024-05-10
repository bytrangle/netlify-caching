import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    // Get the page content
    const response = await context.next()
    const page = await response.text()
    // regex for searching between blockquote tags
    const catFactResponse = await fetch("https://meowfacts.herokuapp.com")
    const json = await catFactResponse.json()
    console.log(json)
    const fact = json.data[0]
    // Regex for text between block quote
    const blockquoteRegex = /(?<=<blockquote.+>).+(?=<\/blockquote>)/
    const matched = blockquoteRegex.exec(page)
    console.log({ matched })
    let updatedPage = page
    if (page.match(blockquoteRegex).length) {
        updatedPage = page.replace(blockquoteRegex, fact)
    }
    return new Response(updatedPage, {
        headers: {
            "Content-Type": "text/html",
            "Cache-Tag": "trivia",
            "Cache-Control": "public, max-age=60"
        }
    })
}

export const config: Config = {
    cache: "manual",
    path: "/cat-trivia"
}