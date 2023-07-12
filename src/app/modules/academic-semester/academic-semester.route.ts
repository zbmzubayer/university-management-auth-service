import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academic-semester.controller';
import { academicSemesterValidation } from './academic-semester.validation';

const router = Router();

router.post(
  '/create',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.create
);
router.get('/:id', academicSemesterController.getById);
router.get('/', academicSemesterController.getAll);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), academicSemesterController.deleteById);

export const academicSemesterRouter = router;
