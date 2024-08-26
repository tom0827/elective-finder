export interface Course {
    id: string,
    program: string,
    course_type: string,
    course_number: boolean,
    is_offered: boolean,
    term: string
    description: string,
    pre_and_corequisites: string,
    pid: string,
    elective_type: string,
}