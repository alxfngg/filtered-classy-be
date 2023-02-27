import { Router } from "express";
import multer from 'multer';
import * as BucketController from "../controller/bucket.controller";
import * as CourseController from "../controller/course.controller";
import * as DepartmentController from "../controller/department.controller"
import * as MajorMinorController from "../controller/majorminor.controller"
import * as ProfessorController from "../controller/professor.controller"
import * as RequirementController from "../controller/requirement.controller"
import * as StudentController from "../controller/student.controller"
import * as TermController from "../controller/term.controller"
import * as UserController from "../controller/user.controller"
import * as VisibilityGroupController from "../controller/visibilitygroup.controller"
import * as WaitlistEntryController from "../controller/waitlistentry.controller"
import * as PeriodController from "../controller/period.controller"
import * as ExploreController from "../controller/explore.controller"
import * as SearchController from "../controller/search.controller"
import * as WaitlistController from "../controller/waitlist.controller"
import * as ReviewController from "../controller/review.controller"
import { CourseModel } from "../model/course.model";
import { UploadController } from '../controller/s3.controller';
import { multerConfig } from '../config/multerConfig';
import { Request } from "express";
import console from "console";

const router = Router();

// s3
const upload = multer({
    storage: multerConfig.storage,
    fileFilter: multerConfig.fileFilter
});
router.post("/upload", upload.single('uploaded_file'), UploadController.Upload);


// get buckets of courses for the major or minor
router.route('/buckets')
    .get(async (req, res) => {
        try {
            const result = await BucketController.getBuckets();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await BucketController.createBucket(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/buckets/:id')
    .get(async (req, res) => {
        try {
            const result = await BucketController.getBucket(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await BucketController.updateBucket(req.body.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await BucketController.deleteBucket(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/courses')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getCourses();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await CourseController.createCourse(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/courses/distrib/:distrib')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getDistribCourses("distrib", req.params.distrib);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/courses/wc/:wc')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getDistribCourses("wc", req.params.wc);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/courses/:dept')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getDeptCourses(req.params.dept);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/courses/:dept/:num')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getCourse(req.params.dept, req.params.num);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await CourseController.updateCourse(req.params.dept, req.params.num, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await CourseController.deleteCourse(req.params.dept, req.params.num);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/student/:studentId/:courseId/:mode/:result')
    .put(async (req, res) => {
        try {
            if (req.params.mode === 'taken') {
                await StudentController.markAsTaken(req.params.studentId, req.params.courseId, req.params.result);
            } else if (req.params.mode === 'cart') {
                await StudentController.shoppingCart(req.params.studentId, req.params.courseId, req.params.result);
            } else if (req.params.mode === 'current'){
                await StudentController.currentCourses(req.params.studentId, req.params.courseId, req.params.result);
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/reviews/:course/:offeringIndex')
    .post(async (req, res) => {
        try {
            await CourseModel.findByIdAndUpdate(req.params.course,
                { '$inc': { 'reviewCount': 1 } },
            )
            const result = await ReviewController.createReview(req.params.course, req.params.offeringIndex, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/departments')
    .get(async (req, res) => {
        try {
            const result = await DepartmentController.getDepartments();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await DepartmentController.createDepartment(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/departments/:code')
    .get(async (req, res) => {
        try {
            const result = await DepartmentController.getDepartment(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await DepartmentController.updateDepartment(req.params.code, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await DepartmentController.deleteDepartment(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/majorminors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajorMinors();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await MajorMinorController.createMajorMinor(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/majors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajors();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/minors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMinors();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/majorminor/:id')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajorMinor(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await MajorMinorController.updateMajorMinor(req.body.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await MajorMinorController.deleteMajorMinor(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/professors')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getProfessors();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await ProfessorController.createProfessor(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/professors/dept/:code')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getDeptProfessors(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/professors/:name')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getProfessor(req.params.name);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await ProfessorController.updateProfessor(req.params.name, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await ProfessorController.deleteProfessor(req.params.name);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/requirements')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirements();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await RequirementController.createRequirement(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/requirements/:id')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirement(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await RequirementController.updateRequirement(req.body.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await RequirementController.deleteRequirement(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/students')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getStudents();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await StudentController.createStudent(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/course/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getCourseStudents(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/major/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getMajorStudents(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/minor/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getMinorStudents(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/favprofs/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getFavProfsStudents(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getStudent(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log("req body:::", req.body);
            const result = await StudentController.updateStudent(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await StudentController.deleteStudent(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/terms')
    .get(async (req, res) => {
        try {
            const result = await TermController.getTerms();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await TermController.createTerm(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/terms/:code')
    .get(async (req, res) => {
        try {
            const result = await TermController.getTerm(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await TermController.updateTerm(req.params.code, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await TermController.deleteTerm(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/users')
    .get(async (req, res) => {
        try {
            const result = await UserController.getUsers();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await UserController.createUser(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/users/:id')
    .get(async (req, res) => {
        try {
            const result = await UserController.getUser(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await UserController.updateUser(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await UserController.deleteUser(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/students/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getStudent(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await StudentController.updateStudent(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await StudentController.deleteStudent(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/students/friends/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getFriends(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/visibilitygroups')
    .get(async (req, res) => {
        try {
            const result = await VisibilityGroupController.getVisibilityGroups();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await VisibilityGroupController.createVisibilityGroup(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/visibilitygroups/:id')
    .get(async (req, res) => {
        try {
            const result = await VisibilityGroupController.getVisibilityGroup(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await VisibilityGroupController.updateVisibilityGroup(req.body.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await VisibilityGroupController.deleteVisibilityGroup(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/waitlistentries')
    .get(async (req, res) => {
        try {
            const result = await WaitlistEntryController.getWaitlistEntries();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await WaitlistEntryController.createWaitlistEntry(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/waitlistentries/:id')
    .get(async (req, res) => {
        try {
            const result = await WaitlistEntryController.getWaitlistEntry(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await WaitlistEntryController.updateWaitlistEntry(req.body.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await WaitlistEntryController.deleteWaitlistEntry(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/periods')
    .get(async (req, res) => {
        try {
            const result = await PeriodController.getPeriods();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await PeriodController.createPeriod(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/periods/:code')
    .get(async (req, res) => {
        try {
            const result = await PeriodController.getPeriod(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const result = await PeriodController.updatePeriod(req.params.code, req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await PeriodController.deletePeriod(req.params.code);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/explore')
    .get(async (req, res) => {
        try {
            const result = await ExploreController.getExplore();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })


type Distrib = {
    name: string;
    pastel: string;
    dark: string;
}

type WC = {
    name: string;
    pastel: string;
    dark: string;
}

interface ReqQuery {
    query: string;
    distribFilters: Array<Distrib>;
    wcFilters: Array<WC>;
    nrEligible: boolean;
    offeredNext: boolean;
}

router.route('/search')
    .get(async (req: Request<unknown, unknown, unknown, ReqQuery>, res) => {
        try {
            const result = await SearchController.getSearch(
                req.query.query, 
                req.query.distribFilters, 
                req.query.wcFilters, 
                req.query.offeredNext, 
                req.query.nrEligible
            );
            // console.log(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
            console.log(error);
        }
    })

router.route('/waitlist')
    .get(async (req, res) => {
        try {
            const result = await WaitlistController.getWaitlists();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/waitlist/:dept/:num')
    .get(async (req, res) => {
        try {
            const result = await WaitlistController.getWaitlist(req.params.dept, req.params.num);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/waitlist/join')
    .post(async (req, res) => {
        try {
            const result = await WaitlistController.joinWaitlists(
                req.body.courseDept, req.body.courseNum,
                req.body.studentId, req.body.offerings, req.body.reason);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    )

router.route('/waitlist/addone')
    .put(async (req, res) => {
        try {
            const result = await WaitlistController.addToOneWaitlist(
                req.body.courseDept, req.body.courseNum, req.body.studentId, req.body.offeringIndex);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    )

router.route('/waitlist/remove')
    .put(async (req, res) => {
        try {
            const result = await WaitlistController.removeFromWaitlist(
                req.body.courseDept, req.body.courseNum, req.body.studentId, req.body.offeringIndex);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    )

router.route('/waitlist/withdraw')
    .post(async (req, res) => {
        try {
            const result = await WaitlistController.withdrawFromWaitlist(
                req.body.courseDept, req.body.courseNum, req.body.studentId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    }   
)


router.route('/home')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getStudent('63c4424ce18e75a330906128');
            console.log('returning', result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

export default router;
