import express from "express";
import multer from 'multer'
import { summarize } from '../controllers/summarizerController.js';

// const storage = multer.memoryStorage(); // Store the file in memory

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads'); // Save the uploaded files in the "uploads" directory
    },
    filename: (req, file, callback) => {
        callback(null, 'text.pdf'); // Set the file name to "document.pdf"
    },
});

const upload = multer({ storage });

const router  = express.Router();

router.post('/summarize', upload.single('text'), summarize);

export default router