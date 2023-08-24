import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GenerateFiles } from './lib/utils';

dotenv.config();

const app: Express = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const jsonParser = bodyParser.json();
app.use(errorHandler);

app.get('/api', (req: Request, res: Response) => {
  console.log('GET /api');
  res.send({message: 'Hello from Express Server! (/api endpoint)'});
});

app.get('/', (req: Request, res: Response) => {
  console.log('GET /');
  res.send({message: 'Hello from Express Server! (/ endpoint)'});
});

app.post('/api/generate', jsonParser, (req: Request, res: Response) => {
  console.log('POST /api/generate');
  let fileCount = req.body?.fileCount;
  let numberCount = req.body?.numberCount;
  if (req.body && fileCount && numberCount) {
    GenerateFiles(fileCount, numberCount);
    res.send({message: 'Generating files!'});
  } else {
    res.status(400).send({message: 'Invalid request body'});
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function errorHandler(error: Error, req: Request, res: Response, next: Function) {
  console.log(error);
  res.status(500).send({message: 'Internal server error'});
}

// For future reference:
// const fs = require("fs");
// fs.createReadStream("data.csv", { encoding: "utf-8" })
//   .on("data", (chunk) => {
//     console.log(chunk);
//   })
//   .on("error", (error) => {
//     console.log(error);
//   });