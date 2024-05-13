import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  const text = await response.text()
  return new Response(text.toUpperCase(), {
    headers: {
      "content-type": "text/html",
      "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
      "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
    }
  })
}

export const config: Config = {
  path: "/cache-keys"
}