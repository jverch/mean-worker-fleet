import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/api', (req: Request, res: Response) => {
  console.log('GET /api');
  res.send({message: 'Hello from Express Server! (/api endpoint)'});
});

app.get('/', (req: Request, res: Response) => {
  console.log('GET /');
  res.send({message: 'Hello from Express Server! (/ endpoint)'});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});