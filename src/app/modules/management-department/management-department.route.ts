import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './management-department.controller';
import { managementDepartmentValidation } from './management-department.validation';

const router = Router();

router.post(
  '/create',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(managementDepartmentValidation.createManagementDepartmentZodSchema),
  managementDepartmentController.create
);
router.get('/:id', managementDepartmentController.getById);
router.get('/', managementDepartmentController.getAll);
router.patch(
  '/:id',
  auth(UserRoles.SuperAdmin, UserRoles.Admin),
  validateRequest(managementDepartmentValidation.updateManagementDepartmentZodSchema),
  managementDepartmentController.update
);
router.delete('/:id', auth(UserRoles.SuperAdmin, UserRoles.Admin), managementDepartmentController.deleteById);

export const managementDepartmentRouter = router;
