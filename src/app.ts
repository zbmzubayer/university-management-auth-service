import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRouter } from './app/modules/users/user.route';

const app: Application = express();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/users', userRouter);

// testing
// app.get('/', async (req, res, next) => {
//   Promise.reject(new Error('Ore baba error'));
//   //   throw new Error('Ore baba error');
//   //   throw new ApiError(400, 'Ore baba error');
//   // next('Ore baba error');
// });

// error handler
app.use(globalErrorHandler);

export default app;
