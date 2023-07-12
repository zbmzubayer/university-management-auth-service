import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = Router();

router.get('/', auth(UserRoles.SuperAdmin, UserRoles.Admin), adminController.getAll);
router.get('/:id', adminController.getById);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin),
  validateRequest(adminValidation.updateAdminZodSchema),
  adminController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin), adminController.deleteById);

export const adminRouter = router;
