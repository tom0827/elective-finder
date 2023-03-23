import Head from 'next/head'
import Header from "@/components/Header";
import {useEffect, useState} from "react";

const termMap = {'202305': 'Summer 2023'}

export default function Home() {
    const [program, setProgram] = useState("Software");
    const [electiveType, setElectiveType] = useState("Technical");
    const [selectedTerm, setSelectedTerm] = useState("202305");
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
            if(course[courseName]['for'].includes(program))
            {
                return (
                    <div key={courseName} className="bg-slate-300 p-3 rounded-2xl">
                        <div className="flex flex-row items-center">
                            <div className="font-bold text-2xl">{courseName}</div>
                            &nbsp;
                            <div className="font-semibold text-xl">-&nbsp;{course[courseName]['title']}</div>
                        </div>
                        <div>
                            <div className="flex flex-row">
                                Offered {termMap[selectedTerm]}: &nbsp; {course[courseName]['is_offered'] ? <div>Yes</div> : <div>No</div> }
                            </div>
                            <div>
                                {course[courseName]['description']}
                            </div>
                        </div>
                    </div>
                )
            }

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
          />
          <main className="bg-slate-600">
              <div className="pt-20 px-40 grid grid-cols-3 gap-5">
                  {renderCourseList}
              </div>
          </main>
      </>
  )
}
