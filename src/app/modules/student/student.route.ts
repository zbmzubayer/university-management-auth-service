import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.patch('/:id', studentController.update);
router.delete('/:id', studentController.deleteById);

export const studentRouter = router;
