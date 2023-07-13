import { Router } from 'express';
import { UserRoles } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(authValidation.loginZodSchema), authController.login);
router.post('/access-token', validateRequest(authValidation.refreshTokenZodSchema), authController.getAccessToken);
router.patch(
  '/change-password',
  auth(UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Faculty, UserRoles.Student),
  validateRequest(authValidation.changePasswordZodSchema),
  authController.changePassword
);

export const authRouter = router;
