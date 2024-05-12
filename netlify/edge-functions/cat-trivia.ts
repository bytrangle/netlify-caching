import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  // Get the page content
  const response = await context.next()
  const page = await response.text()
  console.log(page)
  // regex for searching between blockquote tags
  const catFactResponse = await fetch("https://meowfacts.herokuapp.com")
  const json = await catFactResponse.json()
  console.log(json)
  const fact = json.data[0]
  // Regex for text between block quote
  const blockquoteRegex = /(?<=<blockquote.+>).+(?=<\/blockquote>)/
  const dateRegex = /(?<=<time.+>).+(?=<\/time>)/
  let updatedPage = page
  const matchedQuote = updatedPage.match(blockquoteRegex)
  if (matchedQuote && matchedQuote.length) {
    console.log(matchedQuote)
    updatedPage = updatedPage.replace(blockquoteRegex, fact)
  }
  const matchedDate = updatedPage.match(dateRegex)
  if (matchedDate && matchedDate.length) {
    updatedPage = updatedPage.replace(dateRegex, new Date().toUTCString()) // return date in UTC time
  }
  return new Response(updatedPage, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Tag": "trivia",
      "Cache-Control": "public, max-age=60, must-revalidate" // Response will be stored in cache and can be reused while fresh
      // for 60 seconds. Once it becomes stale, it must be validated with the origin server before reuse.
    }
  })
    // return new Response("test", {
    //     status: 200
    // })
}

export const config: Config = {
    cache: "manual",
    path: "/cache-control"
}