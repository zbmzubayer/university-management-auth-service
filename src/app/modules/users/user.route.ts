import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = Router();

router.post('/create', validateRequest(userValidation.createUserZodSchema), userController.createUser);

export const userRouter = router;
