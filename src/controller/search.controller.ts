import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async (searchString: string) => {
    console.log("In getSearch");

    console.log(searchString);

    // function to check if a string contains numbers
    function hasNumber(myString: string) {
        return /\d/.test(myString);
    }

    // if searchString contains numbers, split into numeric (courseNumber) and nonnumeric (courseDept) and query based on strings
    // see https://stackoverflow.com/questions/49887578/splitting-a-string-with-a-decimal-number-and-some-characters for details
    if (hasNumber(searchString)) {
        const result = searchString.match(/[a-zA-Z]+|[\d\.?]+/ig);
        if (result) {
            const nonnumeric = result[0];
            const numeric = result[1];

            const deptNumSearch = await CourseModel.aggregate(
                [
                    {
                      '$search': {
                        'index': 'coursesearch', 
                        'compound': {
                          'must': [
                            {
                              'text': {
                                'query': nonnumeric, 
                                'path': {
                                  'wildcard': '*'
                                }
                              }
                            }, {
                              'text': {
                                'query': numeric, 
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

    // if searchString is exactly 4 characters, search from departments
    if (searchString.length == 4) {
        const deptSearch = await CourseModel.aggregate(
            [
                {
                  '$search': {
                    'index': 'coursesearch', 
                    'text': {
                        'query': searchString,
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

    
    // if searchString doesn't contain any numbers and is not 4 characters long, search from course titles
    const nameSearch = await CourseModel.aggregate(
        [
            {
              '$search': {
                'index': 'coursesearch', 
                'autocomplete': {
                    'query': 'intro to scientific',
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

    // const departments = await DepartmentModel.find( {});
    // console.log('courses:::', courses);
    // return {courses3};
}