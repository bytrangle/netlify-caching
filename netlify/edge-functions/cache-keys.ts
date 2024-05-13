import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  const text = await response.text()
  return new Response(text.toUpperCase(), {
    headers: {
      "content-type": "text/html"
    }
  })
}

export const config: Config = {
  path: "/cache-keys"
}