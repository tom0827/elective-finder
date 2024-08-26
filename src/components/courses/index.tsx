"use client"
import { CourseProvider } from "./CourseContext";
import CourseList from "./CourseList";

const Courses = () => {
  return (
    <CourseProvider>
      <CourseList />
    </CourseProvider>
  )
}

export default Courses;