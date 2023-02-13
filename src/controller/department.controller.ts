import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';
import { ProfessorModel } from '../model/professor.model';

export const getDepartments = async () => {
    const departments = await DepartmentModel.find({}).sort({'name': 1});
    return departments;
}

export const getDepartment = async (code: string) => {
    const department = await DepartmentModel.findOne({codes: code});
    const courses = await CourseModel.find({courseDept: code, required:{"$exists": true}}).sort({'courseNum': 1}).collation({locale: "en_US", numericOrdering: true})
    const noPrereqs = await CourseModel.find({courseDept: code, required: null, courseNum: {"$not":{"$regex":"(9[0-9]|[1-2][0-9][0-9])"}}}).sort({'courseNum': 1}).collation({locale: "en_US", numericOrdering: true})
    const professors = await ProfessorModel.find({departments: code}).sort({'name': 1})
    return {department, courses, noPrereqs, professors};
}

export const loadDepartments = async () => {
    const data = [
        {name: 'African and African-American Studies' , 'codes': ['AAAS']}, 
        {name: 'Anthropology' , 'codes': ['ANTH']}, 
        {name: 'Art History' , 'codes': ['ARTH']}, 
        {name: 'Asian Societies, Cultures, and Languages' , 'codes': ['ASCL','CHIN','JAPN']}, 
        {name: 'Biological Sciences' , 'codes': ['BIOL']}, 
        {name: 'Chemistry' , 'codes': ['CHEM']}, 
        {name: 'Classics' , 'codes': ['CLST','GRK','LAT']}, 
        {name: 'Cognitive Science' , 'codes': ['COGS']}, 
        {name: 'College Courses' , 'codes': ['COCO']}, 
        {name: 'Computer Science' , 'codes': ['COSC']}, 
        {name: 'Comparative Literature' , 'codes': ['COLT']}, 
        {name: 'International Studies' , 'codes': ['INTS']}, 
        {name: 'Earth Sciences' , 'codes': ['EARS']}, 
        {name: 'Economics' , 'codes': ['ECON']}, 
        {name: 'Education' , 'codes': ['EDUC']}, 
        {name: 'Engineering Sciences' , 'codes': ['ENGS']}, 
        {name: 'English and Creative Writing' , 'codes': ['ENGL','CRWT']}, 
        {name: 'Environmental Studies' , 'codes': ['ENVS']}, 
        {name: 'Film and Media Studies' , 'codes': ['FILM']}, 
        {name: 'French and Italian Languages and Literatures' , 'codes': ['FREN','ITAL','FRIT']}, 
        {name: 'Geography' , 'codes': ['GEOG']}, 
        {name: 'German Studies' , 'codes': ['GERM']}, 
        {name: 'Government' , 'codes': ['GOVT']}, 
        {name: 'History' , 'codes': ['HIST']}, 
        {name: 'Humanities' , 'codes': ['HUM']}, 
        {name: 'Jewish Studies' , 'codes': ['JWST']}, 
        {name: 'Latin American, Latino, and Caribbean Studies' , 'codes': ['LACS','LATS']}, 
        {name: 'Linguistics' , 'codes': ['LING']}, 
        {name: 'Mathematics' , 'codes': ['MATH']}, 
        {name: 'Middle Eastern Studies' , 'codes': ['MES','HEBR','ARAB']}, 
        {name: 'Music' , 'codes': ['MUS']}, 
        {name: 'Native American and Indigenous Studies' , 'codes': ['NAS']}, 
        {name: 'Philosophy' , 'codes': ['PHIL']}, 
        {name: 'Physics and Astronomy' , 'codes': ['PHYS','ASTR']}, 
        {name: 'Psychological and Brain Sciences' , 'codes': ['PSYC']}, 
        {name: 'Quantitative Social Science' , 'codes': ['QSS']}, 
        {name: 'Public Policy' , 'codes': ['PBPL']}, 
        {name: 'Religion' , 'codes': ['REL']}, 
        {name: 'Russian Language and Literature' , 'codes': ['RUSS']}, 
        {name: 'Sociology' , 'codes': ['SOCY']}, 
        {name: 'Spanish and Portuguese Languages and Literatures' , 'codes': ['SPAN','PORT']}, 
        {name: 'Studio Art' , 'codes': ['SART']}, 
        {name: 'Theater' , 'codes': ['THEA']}, 
        {name: 'Tuck' , 'codes': ['TUCK']}, 
        {name: 'Women’s, Gender, and Sexuality Studies' , 'codes': ['WGSS']}, 
        {name: 'Writing' , 'codes': ['WRIT']},  
    ]

    for (const entry in data) {
        createDepartment(data[entry]);
    }
}

export const createDepartment = async (department: object) => {
    let data = {};
    try {
        data = await DepartmentModel.create(department);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateDepartment = async (code: string, department: object) => {
    try {
        await DepartmentModel.findOneAndUpdate({codes: code}, {
            department: department,
        }, { new: true }) as object;
        const updatedDepartment: object = await DepartmentModel.findOne({codes: code}) as object;
        return updatedDepartment;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteDepartment = async (code: string) => {
    try {
        let departmentDeleted: object = await DepartmentModel.findOne({codes: code}) as object;
        let deletedCount: number = await (await DepartmentModel.deleteOne({codes: code})).deletedCount;
        if (deletedCount === 1) {
            return { departmentDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}