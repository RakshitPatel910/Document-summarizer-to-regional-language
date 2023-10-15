import { spawn } from "child_process";
import util from 'util';
import fs from 'fs';
import axios from 'axios';
import path from "path";
// import multer from 'multer'

// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage: storage });

export const summarize = async (req, res) => {
    const { uri } = req.body;
    // console.log(req.body.file)
    // const pdfuri = JSON.parse(uri).file
    // console.log(text)
    // const pdf = req.body.file;
    // console.log(req.file)
    let pdfUri = ''
    if (!req.file) {
        // throw Error("FILE_MISSING");
        console.log(1)
        console.log(typeof JSON.parse(req.body.file).uri.uri)
        pdfUri = JSON.parse(req.body.file).uri.uri
      } else {
        console.log(2)
        // console.log(JSON.stringify(req.body.file))
        res.send("success");
      }
    // console.log(console.log(util.inspect(req.body.file, {showHidden: false, depth: null, colors: true})))

    let inputText = '';
    // return res.status(400).json({ data: "hii" });

      try {
      
        const base64Data = await pdfUri.split(',')[1];

        // Decode the Base64 data to obtain binary data
        const binaryPdfData = await Buffer.from(base64Data, 'base64');
      
        const outputPath = await path.join('./uploads', 'output.pdf');
        // Save the binary PDF data to a local file
        fs.writeFileSync(outputPath, binaryPdfData);

        console.log('PDF saved to', outputPath);
      }
      catch (error) {
        console.log(error)
      }

    // try {
    //     const extractText = spawn('python', ['./python/textExtractor']);

    //     pythonProcess.stdin.write(pdfBuffer);

    //     pythonProcess.stdin.end();

    //     pythonProcess.stdout.on('data', (data) => {
    //         inputText = data.toString()
    //     });

    // } catch (error) {
    //     return res.json({ message: "Something went wrong." })
    // }

    // try {
    //     console.log(1)
    //     const extractText = spawn('python', ['./python/textExtractor']);

    //     extractText.stdin.write(pdf);

    //     extractText.stdin.end();
    //     extractText.stdout.on('data', (data) => {
    //         console.log(2)
    //         inputText = data.toString()
    //     });

    //     extractText.on('close', (code) => {
    //         console.log(`extract script exited with code ${code}`);
    //         console.log(inputText)
    //         // return res.status(400).json({ data: summary });
    //     });

    //     console.log(3)
    //     const pythonProcess = spawn('python', ['./python/spaCySummarizer.py']);
        
    //     // const inputText = text;

    //     pythonProcess.stdin.write(inputText);

    //     pythonProcess.stdin.end();
    //     console.log(4)
    //     let summary = '';

    //     await pythonProcess.stdout.on('data', (data) => {
    //         summary += data.toString();
    //         console.log('0')
    //         console.log(summary)
    //         console.log('1')
    //     });
    //     console.log(5)
    //     await pythonProcess.on('close', (code) => {
    //         console.log(`Python script exited with code ${code}`);

    //         return res.status(400).json({ data: summary });
    //     });
    //     console.log(6)
    // } catch (error) {
    //     return res.json({ message: "Something went wrong." })
    // }
}