"use client";
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Course } from "../../models/course";
import { formatDateAsMonthYear } from "../../utils/date";
import { SelectItem } from "../../models/select";
import { titleCase } from "../../utils/string";
import { filterOffered, filterProgram, filterElectiveTypes, filterTerm } from "./CourseFilters";

interface CourseContextProps {
    filteredCourses: Course[] | null;
    programOptions: SelectItem[];
    electiveOptions: SelectItem[];
    termOptions: SelectItem[];
    isOffered: boolean;
    setIsOffered: Dispatch<SetStateAction<boolean>>;
    selectedProgram: string;
    setSelectedProgram:  Dispatch<SetStateAction<string>>;
    selectedElective: string;
    setSelectedElective: Dispatch<SetStateAction<string>>;
    selectedTerm: string;
    setSelectedTerm: Dispatch<SetStateAction<string>>;
    loading: boolean;
}
  
export const CourseContext = createContext<CourseContextProps>({
  filteredCourses: [],
  programOptions: [],
  electiveOptions: [],
  termOptions: [],
  isOffered: true,
  setIsOffered: () => {
    return;
  },
  selectedProgram: "",
  setSelectedProgram: () => {
    return;
  },
  selectedElective: "",
  setSelectedElective: () => {
    return;
  },
  selectedTerm: "",
  setSelectedTerm: () => {
    return;
  },
  loading: true,
});

export const CourseProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isOffered, setIsOffered] = useState<boolean>(true);
  const [selectedProgram, setSelectedProgram] = useState<string>("All");
  const [selectedElective, setSelectedElective] = useState<string>("All");
  const [selectedTerm, setSelectedTerm] = useState<string>("202409");
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_FUNCTIONS_URL || "";
        const res = await fetch(`${baseUrl}/getCourses`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching courses:");
      }
    };
    fetchCourses().then((courses) => {
      setCourses(courses as unknown as Course[]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filteredCourses: Course[] = courses;
    filteredCourses = filterOffered(filteredCourses, isOffered);
    filteredCourses = filterProgram(filteredCourses, selectedProgram);
    filteredCourses = filterElectiveTypes(filteredCourses, selectedElective);
    filteredCourses = filterTerm(filteredCourses, selectedTerm);
    setFilteredCourses(filteredCourses);
  }, [isOffered, selectedProgram, selectedElective, selectedTerm, courses]);

  const programOptions = useMemo(() => {
    const uniquePrograms = Array.from(new Set(courses?.map(course => course.program)))
      .map(program => ({
        value: program,
        label: program, 
      }));
    return uniquePrograms;
  }, [courses]);

  const electiveOptions = useMemo(() => {
    const uniquePrograms = Array.from(new Set(courses?.map(course => course.elective_type)))
      .map(elective_type => ({
        value: elective_type,
        label: titleCase(elective_type), 
      }));
    return uniquePrograms;
  }, [courses]);

  const termOptions = useMemo(() => {
    const uniquePrograms = Array.from(new Set(courses?.map(course => course.term)))
      .map(term => ({
        value: term,
        label: formatDateAsMonthYear(term), 
      }));
    return uniquePrograms;
  }, [courses]);

  return (
    <CourseContext.Provider value={{ 
      filteredCourses,
      programOptions,
      electiveOptions,
      termOptions,
      isOffered,
      setIsOffered,
      selectedProgram,
      setSelectedProgram,
      selectedElective,
      setSelectedElective,
      selectedTerm,
      setSelectedTerm, 
      loading, 
    }}>
      {children}
    </CourseContext.Provider>
  );
};