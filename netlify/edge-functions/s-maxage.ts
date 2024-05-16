import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  if (response.status !== 200) return response
  const text = await response.text()
  console.log(text) // for debugging only

  const transformer = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.tolowercase())
  //     controller.enqueue(chunk.toString().replace(/MR_FRESH_QUOTE/g, "Blossom tea time"))
    }
  })
  return new Response(response.body.pipeThrough(transformer), response)
}

export const config: Config = {
  path: "/s-maxage"
}