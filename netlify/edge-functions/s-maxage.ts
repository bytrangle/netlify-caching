import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  if (response.status !== 200) return response
  // console.log(response)
  // const text = await response.text()

  // console.log(text) // for debugging only

  const transformer = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase())
    }
  })
  // // return new Response(response.body.pipeThrough(transformer), response)
  // let updatedText = text.replace(/MR_FRESH_QUOTE/g, "Deep inside our wonderful world of vertical farms, freshness runs free, bland gets banished, and smart produce secures the future of food.")
  //   return new Response(updatedText, {
  //   headers: {
  //     "content-type": "text/html;charset=utf-8",
  //     "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
  //     "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
  //   }
  // })

  return new Response(response.body.pipeThrough(transformer), response)
}

export const config: Config = {
  path: "/s-maxage"
}