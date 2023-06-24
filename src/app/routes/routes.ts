import { Router } from 'express';
import { academicFacultyRouter } from '../modules/academic-faculty/academic-faculty.route';
import { academicSemesterRouter } from '../modules/academic-semester/academic-semester.route';
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
];
moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
