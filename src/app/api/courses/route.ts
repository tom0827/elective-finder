import { Course } from "@/models/course";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getFreshCourses } from "./courses";
import { isExpired } from "@/utils/date";
import { fixHyperLinks } from "@/utils/string";

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day in milliseconds

interface CourseCache {
  data: Course[],
  timestamp: Date | null
}

let cache: CourseCache = {
  data: [],
  timestamp: null, 
};

const supabase: SupabaseClient = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_PUBLIC_KEY || "");

export async function GET() {
  try {
    let data: Course[] = cache.data;

    if (!cache?.timestamp || isExpired(cache.timestamp, CACHE_DURATION))
    {
      const res = await getFreshCourses(supabase);
      data = res.data as Course[];
      data.sort((a, b) => {
        const courseTypeComparison = a.course_type.localeCompare(b.course_type);
        if (courseTypeComparison === 0) {
          return parseInt(a.course_number) - parseInt(b.course_number);
        }
        return courseTypeComparison;
      });
      data = fixHyperLinks(data);
      cache.data = data as Course[];
      cache.timestamp = new Date();
    }

    return new Response(JSON.stringify({
      courses: data,
      timestamp: cache.timestamp, 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
