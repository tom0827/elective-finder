export default function Sidebar(props) {
    return (
        <>
            <aside className="fixed top-20 z-40 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-3 py-4 overflow-y-auto bg-slate-700 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="ml-3">
                                    <select className="w-40 rounded-lg px-2 py-1" value={props.program} onChange={(e) => props.setProgram(e.target.value)}>
                                        <option value="Software">Software</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Biomedical">Biomedical</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="Civil">Civil</option>
                                </select>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                        <select className="w-40 rounded-lg px-2 py-1" value={props.electiveType} onChange={(e) => props.setElectiveType(e.target.value)}>
                                            <option value="Technical">Technical</option>
                                            <option value="Natural">Natural Science</option>
                                            <option value="Complementary">Complementary</option>
                                        </select>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                      <select className="w-40 rounded-lg px-2 py-1" value={props.selectedTerm} onChange={(e) => props.setSelectedTerm(e.target.value)}>
                                        <option value="202305">Summer 2023</option>
                                      </select>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={props.offeredCourses} onChange={() => props.setOfferedCourses(!props.offeredCourses)} />
                                        <div className="w-12 h-6 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                        <span className="ml-3 text-lg text-slate-200 dark:text-gray-300">
                                            Offered
                                        </span>
                                    </label>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}