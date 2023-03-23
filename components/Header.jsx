export default function Header(props) {
    return (
        <>
            <header className="h-20 flex px-10 shadow-md sticky top-0">
                <div className="grid grid-cols-4 w-full">
                    <div className="flex items-center justify-center text-3xl text-slate-600 font-semibold">Elective Finder</div>
                    <div className="flex items-center justify-center ">
                        <div className="pr-2 text-xl">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            I'm in
                        </div>
                        <select className="w-40 border-2 border-slate-600 rounded-lg px-2 py-1"
                                value={props.program}
                                onChange={(e) => props.setProgram(e.target.value)
                                }>
                            <option value="Software">Software</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Computer">Computer</option>
                            <option value="Biomedical">Biomedical</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>
                        <div className="pl-2 text-xl">
                            engineering
                        </div>
                    </div>
                    <div className="flex items-center justify-center ">
                        <div className="pr-2 text-xl">
                            Looking for
                        </div>
                        <select className="w-40 border-2 border-slate-600 rounded-lg px-2 py-1"
                                value={props.electiveType}
                                onChange={(e) => props.setElectiveType(e.target.value)
                                }>
                            <option value="Technical">Technical</option>
                            <option value="Natural Science">Natural Science</option>
                            <option value="Complementary">Complementary</option>
                        </select>
                        <div className="pl-2 text-xl">
                            electives
                        </div>
                    </div>
                    <div className="flex items-center justify-center ">
                        <div className="pr-2 text-xl">
                            Term
                        </div>
                        <select className="w-40 border-2 border-slate-600 rounded-lg px-2 py-1"
                                value={props.selectedTerm}
                                onChange={(e) => props.setSelectedTerm(e.target.value)
                                }>
                            <option value="202305">Summer 2023</option>
                        </select>
                    </div>
                </div>
            </header>
        </>
    )
}