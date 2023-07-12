import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = Router();

router.get('/', auth(UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Faculty), studentController.getAll);
router.get(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Faculty, UserRoles.Student),
  studentController.getById
);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(studentValidation.updateStudentZodSchema),
  studentController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), studentController.deleteById);

export const studentRouter = router;
