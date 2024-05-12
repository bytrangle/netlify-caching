import crypto from "node:crypto"
import type { Config, Context } from "@netlify/edge-functions"

// export default async (request: Request, context: Context) => {
//   const response = await context.next()
//   console.log("Received etag: ", response.headers)
//   let body = await response.text()
//   console.log(body)
//   const quotes = ["My dear, I'm a cat. Everything I see is mine.", "I don't really have owners. I have staff."]
//   const quote = Math.random() < 0.5 ? quotes[0] : quotes[1]
//   console.log({ quote })
//   const quoteRegex = new RegExp(quote)
//   const quoteElementRegex = /(?<=<blockquote.+>).+(?=<\/blockquote>)/
//   const dateRegex = /(?<=<time.+>).+(?=<\/time>)/
//   let updatedBody = body
//   // // Only modify the response if the newly chosen quote is different from the last one
//   if (!updatedBody.match(quoteRegex)) {
//     updatedBody = updatedBody.replace(quoteElementRegex, quote)
//     // console.log("Updated body after replacing quote:")
//     // console.log(updatedBody)
//     updatedBody = updatedBody.replace(dateRegex, new Date().toUTCString())
//   }
//   console.log(updatedBody)
//   const etag = `${crypto.createHash("md5").update(updatedBody).digest("hex")}`
//   const headers = {
//     "Content-Type": "text/html",
//     "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
//     "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
//     // "ETag": etag
//   }
//   console.log(request.headers)
//   // if (request.headers["if-none-match"] === etag) {
//   //   return new Response(updatedBody, {
//   //     status: 304,
//   //     headers
//   //   })
//   // }
//   console.log("Regenerating quote")
//   return new Response(updatedBody, {
//     status: 200,
//     headers
//   })
// }

export default async () => new Response("Hello, world!")

export const config: Config = {
  path: "/etag"
}