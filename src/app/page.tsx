"use client";
import { CourseProvider } from "../components/courses/CourseContext";
import CourseList from "../components/courses/CourseList";

export default function Courses() {
  return (
    <CourseProvider>
      <CourseList />
    </CourseProvider>
  );
}
