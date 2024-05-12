import crypto from "node:crypto"
import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  let body = await response.text()
  console.log(body)
  const quotes = ["My dear, I'm a cat. Everything I see is mine.", "I don't really have owners. I have staff."]
  const quote = Math.random() < 0.5 ? quotes[0] : quotes[1]
  const quoteRegex = new RegExp(quote)
  const quoteElementRegex = /(<blockquote.*>)(.+)(<\/blockquote>)/
  const dateRegex = /(?<=<time.+>).+(?=<\/time>)/
  let updatedBody = body
  // // Only modify the response if the newly chosen quote is different from the last one
  if (!updatedBody.match(quoteRegex)) {
    updatedBody = updatedBody.replace(quoteElementRegex, `$1${quote}$2`)
    updatedBody = updatedBody.replace(dateRegex, new Date().toUTCString())
  }
  console.log(updatedBody)
  // const etag = `${crypto.createHash("md5").update(body).digest("hex")}`
  // const headers = {
  //   "Content-Type": "text/html",
  //   "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
  //   "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
  //   "ETag": etag
  // }
  // if (request.headers["if-none-match"] === etag) {
  //   return new Response(body, {
  //     status: 304,
  //     headers: headers
  //   })
  // }
  // console.log("Regenerating quote")
  return new Response(updatedBody, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Tag": "trivia",
      "Cache-Control": "public, max-age=60, must-revalidate" // Response will be stored in cache and can be reused while fresh
      // for 60 seconds. Once it becomes stale, it must be validated with the origin server before reuse.
    }
  })
}

export const config: Config = {
  cache: "manual",
  path: "/etag"
}