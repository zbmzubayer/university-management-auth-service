import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academic-faculty.controller';
import { academicFacultyValidation } from './academic-faculty.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.create
);
router.get('/', academicFacultyController.getAll);
router.get('/:id', academicFacultyController.getById);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.update
);
router.delete('/:id', academicFacultyController.deleteById);

export const academicFacultyRouter = router;
