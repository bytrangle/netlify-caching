import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  if (response.status !== 200) return response
  const text = await response.text()
  console.log(text) // for debugging only
  return new Response(text, {
    headers: {
      "content-type": "text/html;charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
      "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
    }
  })
//      const response = await context.next()
  // const transformer = new TransformStream({
  //   transform(chunk, controller) {
  //     controller.enqueue(chunk.toString().replace(/MR_FRESH_QUOTE/g, "Blossom tea time"))
  //   }
  // })
  // return new Response(response.body.pipeThrough(transformer), response)
}

export const config: Config = {
  path: "/s-maxage"
}