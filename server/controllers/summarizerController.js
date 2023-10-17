import { spawn } from "child_process";
import { translate } from '@vitalets/google-translate-api'
import util from 'util';
import fs from 'fs';
import axios from 'axios';
import path from "path";

// import multer from 'multer'
// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage: storage });
// 'memoriesapp-355805'

let inputText = '';
let summary = '';

// const translateSummary = async () => {
//   const text = 'Hello, world!';
//   // const targetLangCode = 'hi'
//   try {
//     const res = await translate(text, {from:'en', to:'hi'})
//     console.log(res)
//     return 
//   } catch (error) {
//     console.log(error)
//   }
// }

const savePDF = async ( pdfUri ) => {
  const base64Data = await pdfUri.split(',')[1];

  const binaryPdfData = await Buffer.from(base64Data, 'base64');
    
  const outputPath = await path.join('./uploads', 'output.pdf');
      
  fs.writeFileSync(outputPath, binaryPdfData);

  console.log('PDF saved to', outputPath);
}

const summarizeText = async ( ratio, lang, res ) => {
  try {
    const pythonProcess = spawn('python', ['./python/spaCySummarizer.py']);
    
    pythonProcess.stdin.write(ratio);
    pythonProcess.stdin.end();

    // let summary = '';

    await pythonProcess.stdout.on('data', (data) => {
        summary = data.toString();
        // console.log(data, 'data')
        console.log(summary, 'summary')
    });

    await pythonProcess.on('close', async (code) => {
        console.log(`Python script exited with code ${code}`);

        // const translatedSummary = await translate(summary , {from:'en', to:'hi'})
        let translatedSummary = '';

        if( lang == 'Hindi' ) {
          translatedSummary = await translate(summary , {from:'en', to:'hi'});
        } 
        else if ( lang == 'Marathi' ) {
          translatedSummary = await translate(summary , {from:'en', to:'mr'})
        }

        return res.json({ summaryText: summary, translatedSummary: translatedSummary.text, success: true })
    });

  } catch (error) {
    console.log(error)
  }
}


export const summarize = async (req, res) => {
    const body = JSON.parse(req.body.file);

    let pdfUri = '';

    if (!req.file) {
        // console.log(typeof JSON.parse(req.body.file).uri.uri)
        pdfUri = await JSON.parse(req.body.file).uri.uri;
        console.log(JSON.parse(req.body.file).language);
        console.log(JSON.parse(req.body.file).summarizationType.ratio);
        // console.log(JSON.parse(req.body.file));
    } else {
        res.send("success");
    }
            
    try {
      await savePDF(pdfUri);

      await summarizeText(body.summarizationType.type, body.language.language, res);


      // return res.json({ summaryText: summary, success: true });
    }
    catch (error) {
        return res.json({ message: "Something went wrong." });
    }
}