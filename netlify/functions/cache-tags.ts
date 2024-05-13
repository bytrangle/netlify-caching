import type { Config } from "@netlify/functions";

export default async () => {
  const resp = await fetch(
    "https://meowfacts.herokuapp.com"
  );
  const json = await resp.json();
  const fact = json.data[0]
  const body = `<!doctype html><html>
    <head>
      <title>Cache-Tag</title>
      <link rel="stylesheet" href="/styles/global.css">
    </head>
    <body>
      <main class="main>
        <div class="main-content__text>
          <h1>Cache-Tag Demo</h1>
          div class="blockquote-container">
            <blockquote id="blockquote">${fact}</blockquote>
            <aside><p>Last updated time: <time id="last-updated-time">${new Date().toUTCString()}</time></p></aside>
          </div>
          <p>&#x1F63A; The <code>Netlify-Cdn-Cache-Control</code> field of the response header has been set to 31536000. This means you will get this same fact for a year, unless there is a new deploy! Can't wait? Click the purge button.</p>
          <div class="purge_buttons">
            <form action="/purge?tag=cat-facts" method="post">
              <button name="purge">Purge with electronics tag</button>
            </form>
          </div>
        </div>
      </main>
    </body><html>`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Tag": "cat-facts",
      "Netlify-Cdn-Cache-Control": "public, s-maxage=31536000, must-revalidate", // Tell Netlify to cache the content up to 1 year
      "Cache-Control": "public, max-age=0, must-revalidate" // Tell the browser to always revalidate
    }
  });
};

export const config: Config = {
  path: "/cache-tags"
};