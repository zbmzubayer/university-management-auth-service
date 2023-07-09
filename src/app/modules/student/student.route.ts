import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = Router();

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.patch('/:id', validateRequest(studentValidation.updateStudentZodSchema), studentController.update);
router.delete('/:id', studentController.deleteById);

export const studentRouter = router;
