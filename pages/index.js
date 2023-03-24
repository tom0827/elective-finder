import Head from 'next/head'
import Header from "@/components/Header";
import {useEffect, useState} from "react";

const termMap = {'202305': 'Summer 2023'}

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

    const renderCourseList = courses.map(course =>
        {
            const courseName = Object.keys(course)[1]

            if(!course[courseName]['for'].includes(program)) return

            if(offeredCourses === true && course[courseName]['is_offered'] !== true) return

            return (
                <div key={courseName} className="flex justify-center text-center bg-slate-600 p-3 rounded-2xl text-slate-200 cursor-pointer hover:bg-slate-800">
                    <div className="flex flex-col items-center">
                        <div className="font-bold text-2xl">{courseName}:</div>
                        <div className="font-semibold text-md">{course[courseName]['title']}</div>
                    </div>
                </div>
            )

        }
    );

    return (
      <>
          <Head>
              <title>Elective Finder</title>
          </Head>
          <Header
              program={program}
              setProgram={setProgram}
              electiveType={electiveType}
              setElectiveType={setElectiveType}
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              offeredCourses={offeredCourses}
              setOfferedCourses={setOfferedCourses}
          />
          <main className="bg-slate-500 h-screen">
              <div className="bg-slate-500 py-20 px-40 grid grid-cols-4 gap-x-44 gap-y-12">
                  {renderCourseList}
              </div>
          </main>
      </>
  )}
