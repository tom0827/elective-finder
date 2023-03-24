import Head from 'next/head'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {useEffect, useState} from "react";

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

    const renderCourseList
        = courses.map(course =>
        {
            const courseName = Object.keys(course)[1]
            console.log(course[courseName])

            if(!course[courseName]['for'].includes(program)) return

            if(offeredCourses === true && course[courseName]['is_offered'] !== true) return

            return (
                <tr key={courseName} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {courseName}
                    </td>
                    <td className={"px-6 py-4"}>
                        {course[courseName]['title']}
                    </td>
                    <td className={"px-6 py-4"}>
                        {course[courseName]['is_offered'] ?
                            <span className={"text-green-500"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>

                            </span>
                            : <span className={"text-red-500"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>

                            </span>}
                    </td>
                    <td className={"px-6 py-4"}>
                        {course[courseName]['description']}
                    </td>
                </tr>
            )

        }
    );

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
              <div className="bg-gray-200 pt-20">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="sticky top-20 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope={"col"} className={"px-6 py-3"}>
                                  Course
                              </th>
                              <th scope={"col"} className={"px-6 py-3"}>
                                  Title
                              </th>
                              <th scope={"col"} className={"px-6 py-3"}>
                                  Offered
                              </th>
                              <th scope={"col"} className={"px-6 py-3"}>
                                  Description
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                        {renderCourseList}
                      </tbody>
                  </table>
              </div>
          </main>
      </>
  )}
