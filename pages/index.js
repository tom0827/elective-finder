import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [program, setProgram] = useState("Software");
    const [electiveType, setElectiveType] = useState("Technical");
    const [selectedTerm, setSelectedTerm] = useState("202305");
    const [courses, setCourses] = useState([])

    async function getCourses() {
        const response = await fetch('/api/courses')
        return response.json()
    }

    useEffect(() => {
        getCourses()
            .then((response) => {
                setCourses(response)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [electiveType, selectedTerm])
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
          <main>
              {/*{courses.map(course => {displayCourse(course)})}*/}
          </main>
      </>
  )
}
