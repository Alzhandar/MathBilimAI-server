import { Request, Response, Router } from 'express';
import multer from 'multer';
import tesseract from 'tesseract.js';
import { analyzeTask } from '../services/aiService';

const upload = multer({ dest: 'uploads/' });

export const uploadTaskHandler = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imagePath = req.file.path;
        const { data: { text } } = await tesseract.recognize(imagePath, 'eng');

        res.json({ text });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
};

export const analyzeTaskHandler = async (req: Request, res: Response) => {
    const { text } = req.body;
    try {
        const prompt = `
        Here is a math problem: "${text}".
        1. List the topics the user should know to solve this problem. Use high-level Kazakh language.
        2. Provide a step-by-step solution to the problem using KaTeX without any additional commentary.
        `;
        const analysis = await analyzeTask(prompt);
        res.json({ analysis });
    } catch (error) {
        console.error('Error analyzing task:', error);
        res.status(500).json({ error: 'Failed to analyze task' });
    }
};

export const uploadTaskRouter = (router: Router) => {
    router.post('/upload-task', upload.single('image'), uploadTaskHandler);
    router.post('/analyze-task', analyzeTaskHandler);
};
