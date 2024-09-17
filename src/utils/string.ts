import { UVIC_CALENDER_BASE_URL } from "@/constants/links";
import { Course } from "@/models/course";

export const titleCase = (word: string) => {
  return word.replace("_", " ").toUpperCase().replace(/\b\w/g, char => char.toUpperCase());
};

export const fixHyperLinks = (courses: Course[]) => {
  return courses.map((course: Course) => {
    if (course.pre_and_corequisites && course.pre_and_corequisites.includes("href")) {
      // eslint-disable-next-line quotes
      const new_href = course.pre_and_corequisites.replace(/href="#\//g, `href="${UVIC_CALENDER_BASE_URL}`);
      return {
        ...course,
        pre_and_corequisites: new_href,
      };
    }
    return course;
  });
};