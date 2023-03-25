export default function CourseTable(props) {

    const renderCourseList = props.courses.map(course =>
        {
            const courseName = Object.keys(course)[1]

            if(!course[courseName]['for'].includes(props.program)) return

            if(props.offeredCourses === true && course[courseName]['is_offered'] !== true) return

            return (
                <tr key={courseName} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {courseName}
                    </td>
                    <td className={"px-6 py-4"}>
                        {course[courseName]['title']}
                    </td>
                    <td className={"px-6 py-4 flex justify-center"}>
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
            <div className={"bg-gray-200 pt-20"}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-20 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope={"col"} className={"px-6 py-6"}>
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
                    <tbody className={"striped"}>
                    {renderCourseList}
                    </tbody>
                </table>
            </div>
        </>
    )
}