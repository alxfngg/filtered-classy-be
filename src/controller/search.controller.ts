import { CourseModel } from '../model/course.model';
import { ProfessorModel } from '../model/professor.model';
import { UserModel } from '../model/user.model';
import { DepartmentModel } from '../model/department.model';
import { nextTerm } from '../constants/nextTerm';

export const getSearch = async (searchString: string, distribFilters: Array<string>, wcFilters: Array<string>, offeredNext: boolean, nrEligible: boolean) => {
    let result = [];
    // console.log(distribFilters)


    // split searchString into numeric (courseNumber) and alpha (courseDept) strings and query based on strings
    // see https://stackoverflow.com/questions/49887578/splitting-a-string-with-a-decimal-number-and-some-characters for match() details
    const alpha = searchString.match(/[a-zA-Z, ]+/ig);
    const numeric = searchString.match(/[\d\.?]+/ig);

    let deptCodes: any[] = [];

    if (alpha) {
        const alphQuery = alpha[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // remove spaces leading and trailing in alpha, escape regex https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

        if (alphQuery.length <= 4) {
            deptCodes.push(alphQuery);
        }

        // if query exactly matches full department name, collect department codes
        const dept = await DepartmentModel.find({ name: new RegExp('^' + alphQuery + '$', 'i') });

        if (dept[0]) { // if department exists, concatenate department codes to deptCodes
            deptCodes = deptCodes.concat(dept[0].codes);
            // console.log(deptCodes)
        }
    }

    // console.log(alpha);
    

    // if numeric values
    if (numeric) { 
        
        const numQuery = numeric[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/^0+/, "") + '.*'; // escape regex https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex, remove all leading 0s in numeric

        // if numeric and alpha values, search for matching alpha AND numeric
        if (alpha) {
            if (deptCodes.length !== 0) {
                console.log("here");

                const promises = deptCodes.map((deptCode) => {
                    return CourseModel.aggregate(
                        [
                            {
                                '$search': {
                                'index': 'coursesearch', 
                                'compound': {
                                    'must': [
                                    {
                                        'text': {
                                        'query': deptCode, 
                                        'path': {
                                            'wildcard': '*'
                                        }
                                        }
                                    }, {
                                        'regex': {
                                        'query': numQuery,
                                        'allowAnalyzedField': true,
                                        'path': {
                                            'wildcard': '*'
                                        }
                                        }
                                    }
                                    ]
                                }
                                }
                            }
                            ]
                    );
                
                });
        
                const searchResults = await Promise.all(promises);
                result = searchResults.flat().sort((a,b) => a.courseNum - b.courseNum); // sort by course number

                // console.log("Searching coursedeptnum");

                // console.log(result);

            }
            
        }

        // if numeric values but no alpha values, search for matching numeric from all courses and sort by courseDept
        else { 
            console.log(alpha);
            result = await CourseModel.aggregate(
                [{
                    '$search': {
                     'index': 'coursesearch',
                     'text': {
                      'query': numQuery,
                      'path': {
                       'wildcard': '*'
                      }
                     }
                    }
                   }, {
                    '$sort': {
                     'courseDept': 1
                    }
                   }]
            );
        }

    }

    if (deptCodes.length !== 0 && !numeric) {
        // console.log(deptCodes + "deptcods")
         
        const promises = deptCodes.map((code) => {
            return CourseModel.aggregate(
            [
                {
                    '$search': {
                    'index': 'coursesearch', 
                    'regex': {
                        'query': code + '.*',
                        'allowAnalyzedField': true,
                        'path': 'courseDept',
                        }
                    // 'text': {
                    //     'query': code,
                    //     'path': 'courseDept'
                    // }
                    }
                    
                },
                {
                    '$sort': {
                        'courseNum': 1
                    }
                }
            ], {
                collation: {
                    locale: "en_US",
                    numericOrdering: true
                }
            }
            );
        
        });

        const searchResults = await Promise.all(promises);
        // console.log(searchResults);
        result = searchResults.flat();
        // console.log(result);
    }

    if (result.length === 0 && searchString) { 
        result = await CourseModel.aggregate(
            [
                {
                    '$search': {
                    'index': 'coursesearch', 
                    'autocomplete': {
                        'query': searchString,
                        'path': 'courseTitle',
                    }
                    }
                },
                {
                    '$addFields': {
                        'score': {
                            '$meta': 'searchScore'
                        }
                    }
                }
                ]
        );
    }

    // console.log(result)


    // if no searchString input but some filter applied, find all courses
    if (!searchString && (distribFilters || wcFilters || offeredNext || nrEligible)) {
        console.log('Getting all courses');
        result = await CourseModel.find({});
    }
    
    if (distribFilters) {
        // const distribNames = distribFilters.map((distrib) => distrib.name);
        result = result.filter((course) => (ArrIntersect(course.distribs, distribFilters).length !== 0));
    }

    if (wcFilters) {
        result = result.filter((course) => wcFilters.includes(course.worldCulture));
    }

    if (offeredNext) {
        result = result.filter((course) => course.offerings?.some((offering: { term: string; }) => offering.term.toUpperCase() === nextTerm.toUpperCase()))
    }

    if (nrEligible) {
        result = result.filter((course) => course.nrEligible)
    }

    return result;
}

const ArrIntersect = (array1: Array<string>, array2: Array<string> ) => {
    // console.log(array1);
    // console.log(array2);
    if (!array1) {
        array1 = [];
    }
    if (!array2) {
        array2 = [];
    }
    return array1.filter(value => array2.includes(value));
}

export const getProfSearch = async (searchString: string) => {
    let result;
    if (searchString) {
        result = await ProfessorModel.aggregate(
            [
                {
                    '$search': {
                        'index': 'profsearch', 
                        'autocomplete': {
                            'query': searchString, 
                            'path': 'name',
                        }
                    }
                }
            ]
        );
    }

    // console.log(result)
   
    return result;
}

export const getStudentSearch = async (searchString: string) => {
    let result;
    if (searchString) {
        result = await UserModel.aggregate(
            [
                {
                    '$search': {
                        'index': 'usersearch', 
                        'compound': {
                            'should': [
                                {
                                    'autocomplete': {
                                        'query': searchString, 
                                        'path': 'firstName'
                                    }
                                }, {
                                    'autocomplete': {
                                        'query': searchString, 
                                        'path': 'lastName'
                                    }
                                }
                            ]
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'students', 
                        'localField': 'student', 
                        'foreignField': '_id', 
                        'as': 'studentObj'
                    }
                }, {
                    '$lookup': {
                        'from': 'departments', 
                        'localField': 'studentObj.majors', 
                        'foreignField': '_id', 
                        'as': 'majors'
                    }
                }
            ]
        );
    }
    // console.log(result)

    result = result?.filter((user) => !!user.student)

    // console.log(result)
   
    return result;
}