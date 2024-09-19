import { SELECT_ALL_OPTION } from "@/constants/util";
import { Course } from "@/models/course";

const filterOffered = (courses: Course[], isOffered: boolean) => {
  if (!courses.length) return courses;
  if (isOffered){
    return courses.filter((course) => course.is_offered == isOffered);
  }
  else return courses;
};

const filterProgram = (courses: Course[], selectedProgram: string, selectedElective: string) => {
  if (!courses.length || selectedProgram == SELECT_ALL_OPTION.value || selectedElective == "COMPLEMENTARY") return courses;
  return courses.filter((course) => course.program == selectedProgram || course.program == "ALL");
};

const filterElectiveTypes = (courses: Course[], selectedElective: string) => {
  if (!courses.length || selectedElective == SELECT_ALL_OPTION.value) return courses;
  return courses.filter((course) => course.elective_type == selectedElective);
};

const filterTerm = (courses: Course[], selectedTerm: string) => {
  if (!courses.length || selectedTerm == SELECT_ALL_OPTION.value) return courses;
  return courses.filter((course) => course.term == selectedTerm);
};

const filterByCourseSearch = (courses: Course[], searchText: string) => {
  if (!searchText || searchText.length == 0) return courses;
  const normalizedSearchText = searchText.toLowerCase();

  return courses.filter((course: Course) => {
    if (!course?.course_type && !course?.course_number) return true;

    const searchOne = (course?.course_type + course?.course_number).toLowerCase();
    const searchTwo = (course?.course_type + " " + course?.course_number).toLowerCase();

    console.log(searchOne, searchTwo, normalizedSearchText);

    return searchOne.includes(normalizedSearchText) || searchTwo.includes(normalizedSearchText);
  });
};

export { filterOffered, filterProgram, filterElectiveTypes, filterTerm, filterByCourseSearch };

