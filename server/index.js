import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import bodyParser from'body-parser';
import { spawn } from "child_process";

const app = express();
import summarizer from './router/summarizer.js';

dotenv.config({ path: './config.env' });

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // to convert incoming data in express to json
app.use(cors());
// require("./db/conn");

app.use("/summarizer", summarizer)
// app.use(require('./router/organizer'))
// app.use(require('./router/event'))
// app.use(require('./router/customer'))

const port = '3010';

// const runPython = async( req, res, next ) => {
    
//     const pythonProcess = spawn('python', ['./pythonModels/spaCySummarizer.py']);

//     let summary = '';

//     pythonProcess.stdout.on('data', (data) => {
//       summary += data.toString();
//       console.log(summary)
//     });

//     pythonProcess.on('close', (code) => {
//       console.log(`Python script exited with code ${code}`);
//     });
// }

app.listen(port, () => {
  console.log("server is running at port 3010");
});

// runPython()



