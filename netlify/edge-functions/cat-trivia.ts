import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    // Get the page content
    const response = await context.next()
    const page = await response.text()
    // regex for searching between blockquote tags
    const catFactResponse = await fetch("https://meowfacts.herokuapp.com")
    const json = await response.json()
    console.log(json)
    const fact = json.data[0]
    const blockquoteRegex = /<blockquote id="blockquote.*>(?<text>.*?)<\/blockquote>/
    const matched = blockquoteRegex.exec(page)
    console.log({ matched })
    if (matched.groups && matched.groups["text"]) {
        const blockquoteText = matched.groups["text"]
        console.log({ blockquoteText })
    }
    return new Response(page, {
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