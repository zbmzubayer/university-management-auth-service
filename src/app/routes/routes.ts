import { Router } from 'express';
import { academicDepartmentRouter } from '../modules/academic-department/academic-department.route';
import { academicFacultyRouter } from '../modules/academic-faculty/academic-faculty.route';
import { academicSemesterRouter } from '../modules/academic-semester/academic-semester.route';
import { adminRouter } from '../modules/admin/admin.route';
import { authRouter } from '../modules/auth/auth.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { managementDepartmentRouter } from '../modules/management-department/management-department.route';
import { studentRouter } from '../modules/student/student.route';
import { userRouter } from '../modules/users/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/academic-semester',
    router: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRouter,
  },
  {
    path: '/management-department',
    router: managementDepartmentRouter,
  },
  {
    path: '/student',
    router: studentRouter,
  },
  {
    path: '/faculty',
    router: facultyRouter,
  },
  {
    path: '/admin',
    router: adminRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
