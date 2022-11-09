import { privateEncrypt } from "crypto";
import express, { Router } from "express";
import * as TaskController from "../controller/task.controller";
import * as BucketController from "../controller/bucket.controller";
import * as CourseController from "../controller/course.controller";
import * as CourseReviewController from "../controller/coursereview.controller"
import * as DepartmentController from "../controller/department.controller"
import * as DeptReviewController from "../controller/deptreview.controller"
import * as MajorMinorController from "../controller/majorminor.controller"
import * as ProfessorController from "../controller/professor.controller"
import * as RequirementController from "../controller/requirement.controller"
import * as StudentController from "../controller/student.controller"
import * as TermController from "../controller/term.controller"
import * as UserController from "../controller/user.controller"
import * as VisibilityGroupController from "../controller/visibilitygroup.controller"
import * as WaitlistEntryController from "../controller/waitlistentry.controller"

const router = Router();

// get buckets of courses for the major or minor
router.route('/buckets')
    .get(async (req, res) => {
        try {
            const result = await BucketController.getBuckets();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/buckets/:id')
    .get(async (req, res) => {
        try {
            const result = await BucketController.getBucket(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await BucketController.createBucket(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await BucketController.updateBucket(req.body.id, req.body.bucket);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
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
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/courses/:id')
    .get(async (req, res) => {
        try {
            const result = await CourseController.getCourse(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseController.createCourse(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseController.updateCourse(req.body.id, req.body.course);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseController.deleteCourse(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/coursereviews')
    .get(async (req, res) => {
        try {
            const result = await CourseReviewController.getCourseReviews();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/coursereviews/:id')
    .get(async (req, res) => {
        try {
            const result = await CourseReviewController.getCourseReview(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseReviewController.createCourseReview(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseReviewController.updateCourseReview(req.body.id, req.body.coursereview);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await CourseReviewController.deleteCourseReview(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/departments')
.get(async (req, res) => {
    try {
        const result = await DepartmentController.getDepartments();
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.route('/departments/:id')
    .get(async (req, res) => {
        try {
            const result = await DepartmentController.getDepartment(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DepartmentController.createDepartment(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DepartmentController.updateDepartment(req.body.id, req.body.department);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DepartmentController.deleteDepartment(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/deptreviews')
    .get(async (req, res) => {
        try {
            const result = await DeptReviewController.getDeptReviews();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/deptreviews/:id')
    .get(async (req, res) => {
        try {
            const result = await DeptReviewController.getDeptReview(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DeptReviewController.createDeptReview(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DeptReviewController.updateDeptReview(req.body.id, req.body.deptreview);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DeptReviewController.deleteDeptReview(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/majorminors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajorMinors();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/majors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajors();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/minors')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMinors();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/majorminor/:id')
    .get(async (req, res) => {
        try {
            const result = await MajorMinorController.getMajorMinor(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await MajorMinorController.createMajorMinor(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await MajorMinorController.updateMajorMinor(req.body.id, req.body.majorminor);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
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
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/professors/dept/:id')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getDeptProfessors(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/professors/course/:id')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getCourseProfessors(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/professors/:id')
    .get(async (req, res) => {
        try {
            const result = await ProfessorController.getProfessor(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await ProfessorController.createProfessor(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await ProfessorController.updateProfessor(req.body.id, req.body.professor);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await ProfessorController.deleteProfessor(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/requirements')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirements();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/requirements/:id')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirement(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await RequirementController.createRequirement(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await RequirementController.updateRequirement(req.body.id, req.body.requirement);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
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
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/course/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getCourseStudents(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/major/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getMajorStudents(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/minor/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getMinorStudents(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/favprofs/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getFavProfsStudents(req.params.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/students/:id')
    .get(async (req, res) => {
        try {
            const result = await StudentController.getStudent(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await StudentController.createStudent(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await StudentController.updateStudent(req.body.id, req.body.student);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
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
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/terms/:id')
    .get(async (req, res) => {
        try {
            const result = await TermController.getTerm(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TermController.createTerm(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TermController.updateTerm(req.body.id, req.body.term);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TermController.deleteTerm(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/users')
    .get(async (req, res) => {
        try {
            const result = await UserController.getUsers();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/users/:id')
    .get(async (req, res) => {
        try {
            const result = await UserController.getUser(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await UserController.createUser(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await UserController.updateUser(req.body.id, req.body.user);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await UserController.deleteUser(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

router.route('/visibilitygroups')
    .get(async (req, res) => {
        try {
            const result = await VisibilityGroupController.getVisibilityGroups();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/visibilitygroups/:id')
    .get(async (req, res) => {
        try {
            const result = await VisibilityGroupController.getVisibilityGroup(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await VisibilityGroupController.createVisibilityGroup(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await VisibilityGroupController.updateVisibilityGroup(req.body.id, req.body.visibilitygroup);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
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
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/waitlistentries/:id')
    .get(async (req, res) => {
        try {
            const result = await WaitlistEntryController.getWaitlistEntry(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await WaitlistEntryController.createWaitlistEntry(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await WaitlistEntryController.updateWaitlistEntry(req.body.id, req.body.waitlistentry);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await WaitlistEntryController.deleteWaitlistEntry(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });


export default router;
