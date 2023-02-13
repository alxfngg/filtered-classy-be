import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async (searchInput: string) => {
    let result = [];
    let searchString = searchInput;
    // console.log(searchString);

    // split searchString into numeric (courseNumber) and alpha (courseDept) strings and query based on strings
    // see https://stackoverflow.com/questions/49887578/splitting-a-string-with-a-decimal-number-and-some-characters for match() details
    const alpha = searchString.match(/[a-zA-Z ]+/ig);
    const numeric = searchString.match(/[\d\.?]+/ig);

    // if numeric values
    if (numeric) { 
        
        const numQuery = numeric[0].replace(/^0+/, ""); // remove all leading 0s in numeric, 

        // if numeric and alpha values, search for matching alpha AND numeric
        if (alpha) {
            console.log("here");

            const alphQuery = alpha[0];

            // console.log("Searching coursedeptnum");
            result = await CourseModel.aggregate(
                [
                    {
                        '$search': {
                        'index': 'coursesearch', 
                        'compound': {
                            'must': [
                            {
                                'text': {
                                'query': alphQuery, 
                                'path': {
                                    'wildcard': '*'
                                }
                                }
                            }, {
                                'text': {
                                'query': numQuery,
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

            console.log(result);
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
    else if (alpha) {
        console.log("No numeric but alpha")

        const alphQuery = alpha[0];

        // if no numeric values but alpha values with length 3 or 4, search for all courses with matching courseDept and sort by courseNum
        if (alphQuery.length == 4 || alphQuery.length == 3) {
            // console.log("Searching dept");
    
            result = await CourseModel.aggregate(
                [
                    {
                        '$search': {
                        'index': 'coursesearch', 
                        'text': {
                            'query': alpha[0],
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
        }
        
        // if no numeric values but contains alpha values and no results, use autocomplete search for matching courseTitle and sort by searchScore
        if (result.length === 0) { 
            // console.log("here");

            result = await CourseModel.aggregate(
                [
                    {
                        '$search': {
                        'index': 'coursesearch', 
                        'autocomplete': {
                            'query': alphQuery,
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

    }

    return result;
}