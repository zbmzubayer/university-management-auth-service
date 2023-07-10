import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = Router();

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);
router.patch('/:id', validateRequest(adminValidation.updateAdminZodSchema), adminController.update);
router.delete('/:id', adminController.deleteById);

export const adminRouter = router;
