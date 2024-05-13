import type { Config } from "@netlify/functions";
import { purgeCache } from "@netlify/functions"

export default async (req: Request) => {
  const url = new URL(req.url);
  const cacheTag = url.searchParams.get("tag");
  const tags = cacheTag ? [cacheTag] : undefined;

  await purgeCache({
    tags
  });

  return Response.redirect(new URL("/", url));
};

export const config: Config = {
  path: "/purge"
};