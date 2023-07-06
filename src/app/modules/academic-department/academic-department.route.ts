import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academic-department.controller';
import { academicDepartmentValidation } from './academic-department.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(academicDepartmentValidation.createAcademicDepartmentZodSchema),
  academicDepartmentController.create
);
router.get('/:id', academicDepartmentController.getById);
router.get('/', academicDepartmentController.getAll);
router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentZodSchema),
  academicDepartmentController.update
);
router.delete('/:id', academicDepartmentController.deleteById);

export const academicDepartmentRouter = router;
