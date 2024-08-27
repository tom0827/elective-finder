import { getCourses } from '@/firebase/firebaseutils';
import { NextResponse } from 'next/server';

let cache: any = null;
let cacheTime: number | null = null;
const CACHE_DURATION_MS = 3600 * 1000;
 
export async function GET() {
  const now = Date.now();

  if (cache && cacheTime && (now - cacheTime < CACHE_DURATION_MS)) {
    console.log("returning cached")
    return NextResponse.json(cache);
  }

  const courses = await getCourses();
  cache = courses;
  cacheTime = now;

  console.log("returning new")
  return NextResponse.json(courses);
}