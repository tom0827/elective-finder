import { SupabaseClient } from "@supabase/supabase-js";

export const getFreshCourses = async (supabase: SupabaseClient) => {
  const res = await supabase.from("course_offerings").select("*");
  return res;
};