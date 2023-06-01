import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
