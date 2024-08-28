import { SELECT_ALL_OPTION } from "@/constants/util";
import { Course } from "@/models/course";

const filterOffered = (courses: Course[], isOffered: boolean) => {
  if (!courses.length) return courses;
  if (isOffered){
    return courses.filter((course) => course.is_offered == isOffered);
  }
  else return courses;
};

const filterProgram = (courses: Course[], selectedProgram: string) => {
  if (!courses.length || selectedProgram == SELECT_ALL_OPTION.value) return courses;
  return courses.filter((course) => course.program == selectedProgram);
};

const filterElectiveTypes = (courses: Course[], selectedElective: string) => {
  if (!courses.length || selectedElective == SELECT_ALL_OPTION.value) return courses;
  return courses.filter((course) => course.elective_type == selectedElective);
};

const filterTerm = (courses: Course[], selectedTerm: string) => {
  if (!courses.length) return courses;
  return courses.filter((course) => course.term == selectedTerm);
};

export { filterOffered, filterProgram, filterElectiveTypes, filterTerm };

