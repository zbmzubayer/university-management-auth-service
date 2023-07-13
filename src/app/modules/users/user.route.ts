import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/create-student',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(userValidation.createStudentZodSchema),
  userController.createStudent
);
router.post(
  '/create-faculty',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(userValidation.createFacultyZodSchema),
  userController.createFaculty
);
router.post(
  '/create-admin',
  auth(UserRoles.SuperAdmin),
  validateRequest(userValidation.createAdminZodSchema),
  userController.createAdmin
);

export const userRouter = router;
