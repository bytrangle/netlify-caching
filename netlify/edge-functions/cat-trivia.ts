import type { Config, Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
    const now = new Date()
    const body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Silly Cat Society</title>
          <link rel="stylesheet" href="/styles/global.css">
          <style>
            .image-container {
              position: relative;
            }
            .icon-container {
              background-color: #fff;
              mask-image: url("/images/setting-icon.svg");
              width: 24px;
              height: 24px;
              mask-size: contain;
              mask-position: center;
              mask-repeat: no-repeat;
              position: absolute;
              right: 1%;
              top: 0;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <h1>Silly Cat Society</h1>
            <p>Welcome! This is the place where you can chill with meow meow.</p>
            <div class="image-container">
              <image src="/images/mr-fresh.png" alt="mr fresh the cat" />
              <div class="icon-container"></div>
            </div>
          </div>
        </body>
      </html>
    `
    const cacheMaxAge = 60 // measured in seconds
    // let elapsedTime = cacheMaxAge
    // const lastRequestedDate = context.cookies.get("lastRequestedDate")
    // if (!context.cookies.get("lastRequestedDate")) {
    //   context.cookies.set("lastVisitedDate", now.toString())
    // } else {
    //   elapsedTime = now.valueOf() - new Date(lastRequestedDate).valueOf()
    // }
    // const catFactResp = await fetch("https://catfact.ninja/fact")
    return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": `max-age=${cacheMaxAge}, public`,
          "Server-Timing": `date;desc="${now}"`
        }
    })
}

export const config: Config = {
    cache: "manual", // opt in to caching
    path: "/*",
    excludedPath: ["/*.css", "/*.svg", "/*.png", "/*.jp(e?)g"]
}