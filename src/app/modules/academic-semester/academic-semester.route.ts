import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academic-semester.controller';
import { academicSemesterValidation } from './academic-semester.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.create
);
router.get('/:id', academicSemesterController.getById);
router.get('/', academicSemesterController.getAll);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.update
);
router.delete('/:id', academicSemesterController.deleteById);

export const academicSemesterRouter = router;
