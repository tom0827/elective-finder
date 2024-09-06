const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, content-type",
  "Access-Control-Allow-Credentials": true,
};

export const getCorsHeaders = (origin) => {
  return {
    ...corsHeaders,
    "Access-Control-Allow-Origin": origin,
  };
};

