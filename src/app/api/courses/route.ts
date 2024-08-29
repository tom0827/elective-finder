import { getCourses } from "../../../../supabase/courses";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json(courses);
};