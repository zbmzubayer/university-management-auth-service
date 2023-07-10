import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './management-department.controller';
import { managementDepartmentValidation } from './management-department.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(managementDepartmentValidation.createManagementDepartmentZodSchema),
  managementDepartmentController.create
);
router.get('/:id', managementDepartmentController.getById);
router.get('/', managementDepartmentController.getAll);
router.patch(
  '/:id',
  validateRequest(managementDepartmentValidation.updateManagementDepartmentZodSchema),
  managementDepartmentController.update
);
router.delete('/:id', managementDepartmentController.deleteById);

export const managementDepartmentRouter = router;
