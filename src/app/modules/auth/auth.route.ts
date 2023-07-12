import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(authValidation.loginZodSchema), authController.login);
router.post('/access-token', validateRequest(authValidation.refreshTokenZodSchema), authController.getAccessToken);

export const authRouter = router;
