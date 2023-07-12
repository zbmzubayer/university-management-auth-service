import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academic-department.controller';
import { academicDepartmentValidation } from './academic-department.validation';

const router = Router();

router.post(
  '/create',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicDepartmentValidation.createAcademicDepartmentZodSchema),
  academicDepartmentController.create
);
router.get('/:id', academicDepartmentController.getById);
router.get('/', academicDepartmentController.getAll);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentZodSchema),
  academicDepartmentController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), academicDepartmentController.deleteById);

export const academicDepartmentRouter = router;
