import { spawn } from "child_process";
import util from 'util';
import fs from 'fs';
import axios from 'axios';
import path from "path";
// import multer from 'multer'
let inputText = '';
let summary = '';
// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage: storage });

const savePDF = async ( pdfUri ) => {
  const base64Data = await pdfUri.split(',')[1];

  const binaryPdfData = await Buffer.from(base64Data, 'base64');
    
  const outputPath = await path.join('./uploads', 'output.pdf');
      
  fs.writeFileSync(outputPath, binaryPdfData);

  console.log('PDF saved to', outputPath);
}

const summarizeText = async ( inputPdfText, res ) => {
  try {
    const pythonProcess = spawn('python', ['./python/spaCySummarizer.py']);
    
    pythonProcess.stdin.write(inputPdfText);
    pythonProcess.stdin.end();

    // let summary = '';

    await pythonProcess.stdout.on('data', (data) => {
        summary += data.toString();
        // console.log(data, 'data')
        console.log(summary, 'summary')
    });

    await pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        return res.json({ summaryText: summary, success: true })
    });

  } catch (error) {
    console.log(error)
  }
}


export const summarize = async (req, res) => {
    const { uri } = req.body;

    let pdfUri = '';

    if (!req.file) {
        // console.log(typeof JSON.parse(req.body.file).uri.uri)
        pdfUri = await JSON.parse(req.body.file).uri.uri;
    } else {
        res.send("success");
    }
            
    try {
      await savePDF(pdfUri);

      await summarizeText('', res);

      // return res.json({ summaryText: summary, success: true });
    }
    catch (error) {
        return res.json({ message: "Something went wrong." });
    }
}