import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = Router();

router.get('/', facultyController.getAll);
router.get('/:id', facultyController.getById);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(facultyValidation.updateFacultyZodSchema),
  facultyController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), facultyController.deleteById);

export const facultyRouter = router;
