import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academic-faculty.controller';
import { academicFacultyValidation } from './academic-faculty.validation';

const router = Router();

router.post(
  '/create',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.create
);
router.get('/', academicFacultyController.getAll);
router.get('/:id', academicFacultyController.getById);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), academicFacultyController.deleteById);

export const academicFacultyRouter = router;
