import { Request, Response } from 'express';
import { generateTest, chatWithAI } from '../services/aiService';

export const generateTestHandler = async (req: Request, res: Response) => {
    const { topic, numQuestions } = req.body;
    try {
        const testContent = await generateTest(topic, numQuestions);
        res.json({ testContent });
    } catch (error: any) {
        console.error('Error generating test:', error);
        res.status(500).json({ error: 'Failed to generate test' });
    }
};

export const chatWithAIHandler = async (req: Request, res: Response) => {
    const { question } = req.body;
    try {
        const answer = await chatWithAI(question);
        res.json({ answer });
    } catch (error: any) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

export const submitTestHandler = async (req: Request, res: Response) => {
    const { answers, correctAnswers } = req.body;
    let score = 0;

    answers.forEach((answer: string, index: number) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
    });

    const recommendations = correctAnswers.map((_: any, index: number) => {
        if (answers[index] !== correctAnswers[index]) {
            return `Review topic related to question ${index + 1}`;
        }
        return null;
    }).filter((recommendation: string | null): recommendation is string => Boolean(recommendation));

    res.json({ score, recommendations });
};
