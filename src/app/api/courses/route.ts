import { getCourses } from '@/firebase/firebaseutils';
import { NextResponse } from 'next/server';

let cache: any = null;
let cacheTime: number | null = null;
const CACHE_DURATION_MS = 3600 * 1000;
 
export async function GET() {
  const courses = await getCourses();
  return NextResponse.json(courses);
}