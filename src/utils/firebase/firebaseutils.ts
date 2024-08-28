import { supabase } from "../supabase/server";

export async function getCourses() {
  try {
    const { data } = await supabase.from("course_offerings").select("*");
    return data;
  } catch (err) {
    console.log(err);
  }
}