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
  // // Only modify the response if the newly chosen quote is different from the last one
  if (!body.match(quoteRegex)) {
    body = body.replace(quoteElementRegex, `$1${quote}$2`)
    body = body.replace(dateRegex, new Date().toUTCString())
  }
  console.log(body)
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
  return new Response(body, {
    status: 200,
    // headers
  })
}

export const config: Config = {
  cache: "manual",
  path: "/etag"
}