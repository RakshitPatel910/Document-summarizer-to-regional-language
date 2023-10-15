import { spawn } from "child_process";

export const summarize = async (req, res) => {
    const { text, language, summarizationType } = req.body;
    // console.log(text)

    try {
        const pythonProcess = spawn('python', ['./python/spaCySummarizer.py']);
        
        const inputText = text;

        pythonProcess.stdin.write(inputText);

        pythonProcess.stdin.end();

        let summary = '';

        await pythonProcess.stdout.on('data', (data) => {
            summary += data.toString();

            // console.log(summary)
        });

        await pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);

            return res.status(400).json({ data: summary });
        });

    } catch (error) {
        return res.json({ message: "Something went wrong." })
    }
}