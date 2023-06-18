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

export const academicSemesterRouter = router;
