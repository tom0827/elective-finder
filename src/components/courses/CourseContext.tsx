"use client";
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Course } from "../../models/course";
import { formatDateAsMonthYear } from "../../utils/date";
import { SelectItem } from "../../models/select";
import { titleCase } from "../../utils/string";
import { filterOffered, filterProgram, filterElectiveTypes, filterTerm } from "./CourseFilters";
import { AppConfig } from "@/config";
import { fetchCookies } from "@/utils/cookies";

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
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedElective, setSelectedElective] = useState<string>("ALL");
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      return data;
    };
    loadCourses().then((data) => {
      setCourses(data?.courses);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    let filteredCourses: Course[] = courses;
    filteredCourses = filterOffered(filteredCourses, isOffered);
    filteredCourses = filterProgram(filteredCourses, selectedProgram, selectedElective);
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

  useEffect(() => {
    if (!programOptions.length) return;
    setSelectedProgram(programOptions[0].value ?? "");
  }, [programOptions]);

  useEffect(() => {
    if (!termOptions.length) return;
    setSelectedTerm(termOptions[0].value ?? "");
  }, [termOptions]);

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