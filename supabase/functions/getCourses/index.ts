import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabase = createClient(Deno.env.get("DB_URL")!, Deno.env.get("DB_ANON_KEY")!);

Deno.serve(async () => {

  const res = await supabase.from("course_offerings").select("*");

  if (res.error) {
    return new Response(
      JSON.stringify(res.error),
      {
        status: res.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json", 
        }, 
      }
    );
  }

  return new Response(
    JSON.stringify(res.data),
    {
      status: res.status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json", 
      }, 
    },
  );
});
