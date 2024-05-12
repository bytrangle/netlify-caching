import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    // Get the page content
    const response = await context.next()
    const page = await response.text()
    console.log(page)
    // // regex for searching between blockquote tags
    // const catFactResponse = await fetch("https://meowfacts.herokuapp.com")
    // const json = await catFactResponse.json()
    // console.log(json)
    // const fact = json.data[0]
    // // Regex for text between block quote
    // const blockquoteRegex = /(?<=<blockquote.+>).+(?=<\/blockquote>)/
    // const dateRegex = /(?<=<time.+>).+(?=<\/time>)/
    // let updatedPage = page
    // if (updatedPage.match(blockquoteRegex).length) {
    //     console.log(updatedPage.match(blockquoteRegex))
    //     updatedPage = updatedPage.replace(blockquoteRegex, fact)
    // }
    // if (updatedPage.match(dateRegex).length) {
    //     const date = new Date()
    //     updatedPage = updatedPage.replace(dateRegex, date.toUTCString()) // return date in UTC time
    // }
    // return new Response(updatedPage, {
    //     headers: {
    //         "Content-Type": "text/html",
    //         "Cache-Tag": "trivia",
    //         "Cache-Control": "public, max-age=60, must-revalidate" // Response will be stored in cache and can be reused while fresh
    //         // for 60 seconds. Once it becomes stale, it must be validated with the origin server before reuse.
    //     }
    // })
    return new Response("test", {
        status: 200
    })
}

export const config: Config = {
    cache: "manual",
    path: "/cache-control"
}