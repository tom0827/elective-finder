import Head from 'next/head'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {useEffect, useState} from "react";
import CourseTable from "@/components/CourseTable";

// const termMap = {'202305': 'Summer 2023'}

export default function Home() {
    const [program, setProgram] = useState("Software");
    const [electiveType, setElectiveType] = useState("Technical");
    const [selectedTerm, setSelectedTerm] = useState("202305");
    const [offeredCourses, setOfferedCourses] = useState(true);
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourses()
            .then((response) => {
                setCourses(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [electiveType, selectedTerm])

    async function getCourses() {
        const response = await fetch('/api/courses')
        return response.json()
    }

    return (
      <>
          <Head>
              <title>Elective Finder</title>
          </Head>
          <Header/>
          <Sidebar
              program={program}
              setProgram={setProgram}
              electiveType={electiveType}
              setElectiveType={setElectiveType}
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              offeredCourses={offeredCourses}
              setOfferedCourses={setOfferedCourses}
          />
          <main className="bg-gray-200 h-screen absolute left-64">
             <CourseTable
                 courses={courses}
                 program={program}
                 offeredCourses={offeredCourses}
             />
          </main>
      </>
  )}
