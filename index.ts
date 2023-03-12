import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(req: Request, connInfo: ConnInfo): Promise<Response> {
  const url = new URL(req.url);
  const addr = connInfo.remoteAddr as Deno.NetAddr;
  const ip = addr.hostname;
  console.log(`Visit from ${ip}`);
  if(url.pathname === "/") {
    return new Response(`Usage: ${url.host}/domain.com`, { status: 404 });
  }
  url.searchParams.append("domain", url.pathname.slice(1));
  url.searchParams.append("sz", 32)
  url.pathname = "/s2/favicons";
  url.protocol = "https:";
  url.hostname = "s2.googleusercontent.com";
  url.port = "443";
  return await fetch(url.href, {
    headers: req.header,
    method: req.method,
    body: req.body,
  });
}

serve(handler);
