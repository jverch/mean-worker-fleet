import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { generateFiles } from './lib/utils';
import { spawn } from 'child_process';

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
    generateFiles(fileCount, numberCount);
    res.send({message: 'Generating files!'});
  } else {
    res.status(400).send({message: 'Invalid request body'});
  }
});

app.get('/api/calculate', jsonParser, (req: Request, res: Response) => {
  console.log('POST /api/calculate');
  let files = ["data/data0.csv", "data/data1.csv", "data/data2.csv", "data/data3.csv", "data/data4.csv"];
  try {
    let dataToSend = '';
    // spawn new child process to call the python script
    const python = spawn('python3', ['python/hello_world.py', JSON.stringify(files)]);
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      console.log('Got data from python script: ' + data.toString());
      dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(JSON.stringify(dataToSend));
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Internal server error'});
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function errorHandler(error: Error, req: Request, res: Response, next: Function) {
  console.log("Error handler");
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