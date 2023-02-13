import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async (searchString: string) => {

    console.log(searchString);

    // function to check if a string contains numbers
    // function hasNumber(myString: string) {
    //     return /\d/.test(myString);
    // }

    // split searchString into numeric (courseNumber) and alpha (courseDept) strings and query based on strings
    // see https://stackoverflow.com/questions/49887578/splitting-a-string-with-a-decimal-number-and-some-characters for match() details
    const alpha = searchString.match(/[a-zA-Z ]+/ig);
    const numeric = searchString.match(/[\d\.?]+/ig);

    // if searchString has numeric values search from courseDept + courseNum
    if (numeric && numeric.length >= 1) {
        // const alpha = searchString.match(/[a-zA-Z]+);
        // const num = searchString.match(/[a-zA-Z]+|[\d\.?]+/ig);
        // if (result) {
        //     alpha = result[0];
        //     numeric = result[1].replace(/^0+/, ""); // remove all leading 0s in numeric
        // }

        const num = numeric[0].replace(/^0+/, ""); // remove all leading 0s in numeric

        if (alpha && alpha[0] && num) {
            console.log("Searching coursedeptnum");

            const deptNumSearch = await CourseModel.aggregate(
                [
                    {
                      '$search': {
                        'index': 'coursesearch', 
                        'compound': {
                          'must': [
                            {
                              'text': {
                                'query': alpha[0], 
                                'path': {
                                  'wildcard': '*'
                                }
                              }
                            }, {
                              'text': {
                                'query': num, 
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

            return deptNumSearch;

        }


    }

    // if alpha is exactly 3 or 4 characters, search from departments
    if (alpha && (alpha[0].length == 4 || alpha[0].length == 3)) {
        console.log("Searching dept");

        const deptSearch = await CourseModel.aggregate(
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

        return deptSearch;

    }

    
    // if searchString contains any alphas, search from course titles
    if (alpha && alpha[0]) {
        const nameSearch = await CourseModel.aggregate(
            [
                {
                  '$search': {
                    'index': 'coursesearch', 
                    'autocomplete': {
                        'query': alpha[0],
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
        return nameSearch;
        // console.log(alpha[0]);
        // console.log("here")
    }

    

    // const departments = await DepartmentModel.find( {});
    // console.log('courses:::', courses);
    // return {courses3};
}