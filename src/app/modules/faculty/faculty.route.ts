import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = Router();

router.get('/', facultyController.getAll);
router.get('/:id', facultyController.getById);
router.patch('/:id', validateRequest(facultyValidation.updateFacultyZodSchema), facultyController.update);
router.delete('/:id', facultyController.deleteById);

export const facultyRouter = router;
