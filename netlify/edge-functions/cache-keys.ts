import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  const response = await context.next()
  const text = await response.text()
  console.log(text)
  return new Response(text, {
    headers: {
      "content-type": "text/html;charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate", // Tell browsers to always revalidate
      "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
    }
  })
}

export const config: Config = {
  path: "/cache-keys"
}