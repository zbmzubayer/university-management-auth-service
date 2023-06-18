import { Router } from 'express';
import { academicSemesterRouter } from '../modules/academic-semester/academic-semester.route';
import { userRouter } from '../modules/users/user.route';

const router = Router();

router.use('/users', userRouter);
router.use('/academic-semester', academicSemesterRouter);

export default router;
