import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes/routes';

const app: Application = express();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', routes);

// testing
// app.get('/', async (req, res, next) => {
//   Promise.reject(new Error('Ore baba error'));
//   //   throw new Error('Ore baba error');
//   //   throw new ApiError(400, 'Ore baba error');
//   // next('Ore baba error');
// });

// error handler
app.use(globalErrorHandler);

// Handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: `Can't find ${req.originalUrl} on this server!`,
      },
    ],
  });
  next();
});

export default app;
