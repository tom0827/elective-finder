export default function Header(props) {
    return (
        <>
            <header className="flex items-center h-20 px-10 shadow-md sticky top-0 bg-slate-800">
                <div className="flex justify-around grid grid-cols-5 w-full">
                    <div className=" text-3xl text-slate-200 font-semibold">Elective Finder</div>
                    <div className="flex items-center">
                        <div className="pr-2 text-xl text-slate-200">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            I'm in
                        </div>
                        <select className="w-40 rounded-lg px-2 py-1"
                                value={props.program}
                                onChange={(e) => props.setProgram(e.target.value)
                                }>
                            <option value="Software">Software</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Computer">Computer</option>
                            <option value="Biomedical">Biomedical</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>
                        <div className="pl-2 text-xl text-slate-200">
                            engineering
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-xl text-slate-200">
                            Looking for
                        </div>
                        <select className="w-40 rounded-lg px-2 py-1"
                                value={props.electiveType}
                                onChange={(e) => props.setElectiveType(e.target.value)
                                }>
                            <option value="Technical">Technical</option>
                            <option value="Natural Science">Natural Science</option>
                            <option value="Complementary">Complementary</option>
                        </select>
                        <div className="pl-2 text-xl text-slate-200">
                            electives
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-xl text-slate-200">
                            Term
                        </div>
                        <select className="w-40 rounded-lg px-2 py-1"
                                value={props.selectedTerm}
                                onChange={(e) => props.setSelectedTerm(e.target.value)
                                }>
                            <option value="202305">Summer 2023</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={props.offeredCourses} onChange={() => props.setOfferedCourses(!props.offeredCourses)} />
                                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-600 dark:peer-focus:ring-slate-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-slate-500"></div>
                                <span className="ml-3 text-xl text-slate-200 dark:text-gray-300">
                                    Offered Courses
                                </span>
                        </label>
                    </div>
                </div>
            </header>
        </>
    )
}