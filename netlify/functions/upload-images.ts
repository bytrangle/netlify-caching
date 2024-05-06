import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    const body = `
        <!doctype html><html>
            <head>
                <title>Silly Cat Society</title>
            </head>
            <body>
                <p>Image uploaded</p>
            </body>
        </html>
    `
    return new Response(body, {
      
    })
}