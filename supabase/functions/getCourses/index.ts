import { createClient } from "jsr:@supabase/supabase-js@2";
import { getCorsHeaders } from "../_shared/cors.ts";
import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const supabase = createClient(Deno.env.get("DB_URL")!, Deno.env.get("DB_ANON_KEY")!);
const secret: string = String(Deno.env.get("JWT_SECRET")!);

const handleVerify = async (token: string, secret: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-512", 
    },
    true,
    ["verify"]
  );
  const payload = await verify(token, key);
  return payload;
};

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

    const cookies = req.headers.get("cookie");
    const token = cookies.split("=")[1];
    await handleVerify(token, secret);
    
    const courseRes = await supabase.from("course_offerings").select("*");

    if (courseRes?.error) {
      return new Response(
        JSON.stringify(courseRes.error),
        {
          status: courseRes.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json", 
          }, 
        }
      );
    }

    return new Response(
      JSON.stringify(courseRes.data),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json", 
        }, 
      },
    );
  } catch(err) {
    console.error("Error getting courses", err);
    return new Response(
      JSON.stringify(err),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json", 
        }, 
      },
    );

  }
});
