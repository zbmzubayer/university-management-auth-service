import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouter from './app/modules/users/user.route';

const app: Application = express();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/users', userRouter);

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
