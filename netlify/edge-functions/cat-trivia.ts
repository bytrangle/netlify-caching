import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    const now = new Date()
    const body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Silly Cat Society</title>
          <link rel="stylesheet" href="/styles/global.css">
        </head>
        <body>
          <p>All the content you'll see on this page is served under the root URL with the help of
            <strong>Netlify Edge Functions</strong> and <strong>Cache-key variations</strong>!
          </p>
        </body>
      </html>
    `
    const cacheMaxAge = 60 // measured in seconds
    // let elapsedTime = cacheMaxAge
    // const lastRequestedDate = context.cookies.get("lastRequestedDate")
    // if (!context.cookies.get("lastRequestedDate")) {
    //   context.cookies.set("lastVisitedDate", now.toString())
    // } else {
    //   elapsedTime = now.valueOf() - new Date(lastRequestedDate).valueOf()
    // }
    // const catFactResp = await fetch("https://catfact.ninja/fact")
    return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": `max-age=${cacheMaxAge}, public`,
          "Server-Timing": `date;desc="${now}"`
        }
    })
}

export const config: Config = {
    cache: "manual", // opt in to caching
    path: "/*",
    excludedPath: ["/*.css"]
}