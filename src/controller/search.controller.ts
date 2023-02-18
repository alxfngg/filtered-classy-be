import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async (searchInput: string) => {
    let result = [];
    let searchString = searchInput;
    console.log(searchString)

    // split searchString into numeric (courseNumber) and alpha (courseDept) strings and query based on strings
    // see https://stackoverflow.com/questions/49887578/splitting-a-string-with-a-decimal-number-and-some-characters for match() details
    const alpha = searchString.trim().match(/[a-zA-Z, ]+/ig);
    const numeric = searchString.match(/[\d\.?]+/ig);

    let deptCodes: any[] = [];

    if (alpha) {
        const alphQuery = alpha[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // remove spaces in alpha, escape regex https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

        if (alphQuery.length == 4 || alphQuery.length == 3) {
            deptCodes.push(alphQuery);
        }

        const dept = await DepartmentModel.find({ name: new RegExp('^' + alphQuery + '$', 'i') });

        // console.log(alpha[0].trim());

        if (dept[0]) { // if department exists, concatenate department codes to deptCodes
            deptCodes = deptCodes.concat(dept[0].codes);
            console.log(deptCodes)
        }
    }

    
    // // find using departments case insensitive regex https://stackoverflow.com/questions/26699885/how-can-i-use-a-regex-variable-in-a-query-for-mongodb
    // if (alpha) {
    //     const dept = await DepartmentModel.find({ name: new RegExp('^' + alpha[0].trim() + '$', 'i') });

    //     if (dept[0]) { // if department exists, concatenate department codes to deptCodes
    //         deptCodes = deptCodes.concat(dept[0].codes);
    //         console.log(deptCodes)
    //     }
    // }

    

    
    // console.log(alpha);
    

    // if numeric values
    if (numeric) { 
        
        const numQuery = numeric[0].replace(/^0+/, "").replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.*'; // remove all leading 0s in numeric,

        // if numeric and alpha values, search for matching alpha AND numeric
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

        // if numeric values but no alpha values, search for matching numeric from all courses and sort by courseDept
        else { 
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

    // if no numeric values but alpha values
    // else if (alpha) {
    //     console.log("No numeric but alpha")

    //     const alphQuery = alpha[0];

    //     // if no numeric values but alpha values with length 3 or 4, search for all courses with matching courseDept and sort by courseNum
    //     if (alphQuery.length == 4 || alphQuery.length == 3) {
    //         // console.log("Searching dept");
    
    //         result = await CourseModel.aggregate(
    //             [
    //                 {
    //                     '$search': {
    //                     'index': 'coursesearch', 
    //                     'text': {
    //                         'query': alphQuery,
    //                         'path': 'courseDept'
    //                     }
    //                     }
    //                 },
    //                 {
    //                     '$sort': {
    //                         'courseNum': 1
    //                     }
    //                 }
        
    //                 ]
    //         );
    //     }
        
        // if no numeric values but contains alpha values and no results, use autocomplete search for matching courseTitle and sort by searchScore
        // if (result.length === 0) { 
        //     // console.log("here");

        //     result = await CourseModel.aggregate(
        //         [
        //             {
        //                 '$search': {
        //                 'index': 'coursesearch', 
        //                 'autocomplete': {
        //                     'query': alphQuery,
        //                     'path': 'courseTitle',
        //                 }
        //                 }
        //             },
        //             {
        //                 '$addFields': {
        //                     'score': {
        //                         '$meta': 'searchScore'
        //                     }
        //                 }
        //             }
        //             ]
        //     );
        // }

    // }

    // if (!numeric && result.length === 0 && alpha) {
    //     // console.log("Searching dept");
    //     const alphQuery = alpha[0].replace(/\s/g, ''); // remove spaces in alpha

    //     if (alphQuery.length == 4 || alphQuery.length == 3) {
            
    //         result = await CourseModel.aggregate(
    //             [
    //                 {
    //                     '$search': {
    //                     'index': 'coursesearch', 
    //                     'text': {
    //                         'query': alphQuery,
    //                         'path': 'courseDept'
    //                     }
    //                     }
    //                 },
    //                 {
    //                     '$sort': {
    //                         'courseNum': 1
    //                     }
    //                 }
        
    //                 ]
    //         );

    //     }
    // }

    if (deptCodes.length !== 0 && !numeric) {
         
        const promises = deptCodes.map((code) => {
            return CourseModel.aggregate(
            [
                {
                    '$search': {
                    'index': 'coursesearch', 
                    'text': {
                        'query': code,
                        'path': 'courseDept'
                    }
                    }
                },
                {
                    '$sort': {
                        'courseNum': 1
                    }
                }
                ]
            );
        
        });

        const searchResults = await Promise.all(promises);
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


    return result;
}