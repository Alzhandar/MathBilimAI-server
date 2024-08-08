import { Request, Response } from 'express';
import Question, { IQuestion } from '../models/Question';

export const addQuestion = async (req: Request, res: Response) => {
    try {
        const questions: IQuestion[] = req.body;
        const savedQuestions = await Question.insertMany(questions);
        res.status(201).json(savedQuestions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении вопроса', error });
    }
};

export const getRandomQuestions = async (req: Request, res: Response) => {
    try {
        const { difficulty, count } = req.query;
        const questions = await Question.aggregate([
            { $match: { difficulty } },
            { $sample: { size: parseInt(count as string, 10) } }
        ]);

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении вопросов', error });
    }
};

export const getQuestionsByDifficulty = async (req: Request, res: Response) => {
    try {
        const { difficulty } = req.query;
        const questions = await Question.find({ difficulty });
        res.status(200).json(questions);
    } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
        res.status(500).json({ message: 'Ошибка при получении вопросов', error });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Question.findByIdAndDelete(id);
        res.status(200).json({ message: 'Вопрос успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении вопроса:', error);
        res.status(500).json({ message: 'Ошибка при удалении вопроса', error });
    }
};

export const deleteQuestionsByDifficulty = async (req: Request, res: Response) => {
    try {
        const { difficulty } = req.query;
        await Question.deleteMany({ difficulty });
        res.status(200).json({ message: 'Все вопросы успешно удалены' });
    } catch (error) {
        console.error('Ошибка при удалении вопросов:', error);
        res.status(500).json({ message: 'Ошибка при удалении вопросов', error });
    }
};

export const getTopics = async (req: Request, res: Response) => {
    try {
        const topics = await Question.distinct('topic');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении тем', error });
    }
};

export const getQuestionsByTopic = async (req: Request, res: Response) => {
    try {
        const { topic } = req.query;
        const questions = await Question.find({ topic });
        res.status(200).json(questions);
    } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
        res.status(500).json({ message: 'Ошибка при получении вопросов', error });
    }
};

export const deleteQuestionsByTopic = async (req: Request, res: Response) => {
    try {
        const { topic } = req.query;
        await Question.deleteMany({ topic: topic as string });
        res.status(200).json({ message: 'Все вопросы по теме успешно удалены' });
    } catch (error) {
        console.error('Ошибка при удалении вопросов по теме:', error);
        res.status(500).json({ message: 'Ошибка при удалении вопросов по теме', error });
    }
};