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

export const academicSemesterRouter = router;
