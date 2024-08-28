import { getCourses } from "@/utils/firebase/firebaseutils";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json(courses);
};