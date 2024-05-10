import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    // Get the page content
    const response = await context.next()
    const page = await response.text()
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