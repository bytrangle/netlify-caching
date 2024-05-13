import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  const text = await response.text()
  const quoteElementRegex = /(?<=<blockquote.+>).+(?=<\/blockquote>)/
  let updatedText = text.replace(quoteElementRegex, "I don't really have owners. I have staff.")
  return new Response(updatedText, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
      "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
    }
  })
}

export const config: Config = {
  path: "/cache-keys"
}