import { create } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { getCorsHeaders } from "../_shared/cors.ts";

const newToken = async () => {
  const header = {
    alg: "HS512",
    typ: "JWT", 
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;

  const payload = {
    iat: now,
    exp: exp,
  };

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    {
      name: "HMAC",
      hash: "SHA-512", 
    },
    true,
    ["sign"]
  );

  const token = await create(header, payload, key);
  return token;
};

const SECRET: string = String(Deno.env.get("JWT_SECRET")!);
const ALLOWED_ORIGINS = String(Deno.env.get("ALLOWED_ORIGINS")!).split(",");

Deno.serve(async (req) => {
  try {
    const origin = req?.headers.get("origin", null);

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response(
        JSON.stringify("Origin not allowed."),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          }, 
        },
      );
    }

    const corsHeaders = getCorsHeaders(origin);

    const token = await newToken();
    const cookieOptions = [
      `authToken=${token}`,
      "HttpOnly",
      "Secure",
      "SameSite=None",
      "Path=/",
      "Max-Age=300",
    ].join("; ");

    return new Response(
      JSON.stringify("Cookie set."),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Set-Cookie": cookieOptions,
        }, 
      },
    );
  } catch (err) {
    console.error("Error generating user token:", err);
    return new Response(
      JSON.stringify({ message: "Error generating user token." }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json", 
        }, 
      },
    );
  }
});
