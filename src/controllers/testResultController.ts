import { Request, Response } from 'express';
import TestResult from '../models/testResultModel';
import User from '../models/userModel';
import { getCorrectAnswerCount } from '../services/aiService';

interface AuthRequest extends Request {
    user?: { id: string };
}

export const saveTestResult = async (req: AuthRequest, res: Response) => {
    const { testName, totalQuestions, correctAnswers, answers } = req.body;
    const userId = req.user?.id;

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const score = await getCorrectAnswerCount(answers, correctAnswers);

        const testResult = new TestResult({
            userId,
            testName,
            totalQuestions,
            correctAnswers,
            answers,
            score
        });

        await testResult.save();

        console.log('Test results saved');

        res.status(201).json({ message: 'Test result saved successfully' });
    } catch (error) {
        console.error('Error saving test result:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserTestResults = async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const testResults = await TestResult.find({ userId });

        res.status(200).json(testResults);
    } catch (error) {
        console.error('Error fetching test results:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const analyzeTestResults = async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const testResults = await TestResult.find({ userId });

        if (testResults.length === 0) {
            return res.status(404).json({ message: 'No test results found for user' });
        }

        // Perform analysis using GPT-4 API or other logic
        // For demonstration, just sending back the test results
        res.status(200).json(testResults);
    } catch (error) {
        console.error('Error analyzing test results:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
