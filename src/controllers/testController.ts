import axios from 'axios';
import { Request, Response } from 'express';
import Question from '../models/Question';

export const submitTest = async (req: Request, res: Response) => {
    try {
        const { answers, correctAnswers } = req.body;
        let score = 0;
        const detailedResults = [];

        for (let i = 0; i < answers.length; i++) {
            const isCorrect = answers[i] === correctAnswers[i];
            if (isCorrect) {
                score++;
            }
            detailedResults.push({
                questionIndex: i,
                isCorrect,
                correctAnswer: correctAnswers[i],
                givenAnswer: answers[i]
            });
        }

        const recommendations = score < answers.length / 2 
            ? ["Жақсы нәтижеге жету үшін қайталау қажет", "Қателеріңізді талдаңыз және тағы да әрекет етіңіз"]
            : ["Жақсы жұмыс! Енді күрделірек тапсырмаларға өтіңіз"];

        const missedTopicsSet = new Set();
        for (const result of detailedResults) {
            if (!result.isCorrect) {
                const question = await Question.findOne({ correctAnswer: result.correctAnswer });
                if (question) {
                    missedTopicsSet.add(question.topic);
                }
            }
        }

        const missedTopics = Array.from(missedTopicsSet);

        res.status(200).json({ score, recommendations, detailedResults, missedTopics });
    } catch (error) {
        console.error('Ошибка при отправке теста:', error);
        res.status(500).json({ message: 'Ошибка при отправке теста', error });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { topics } = req.body;
        const response = await axios.post('https://mathbilimai-vectordb-production-65a7.up.railway.app/create_course', { topics });

        const courseContent = response.data.course_content;

        console.log('Созданный курс:', courseContent);

        res.status(200).json({ course_content: courseContent });
    } catch (error) {
        console.error('Ошибка при создании курса:', error);
        res.status(500).json({ message: 'Ошибка при создании курса', error });
    }
};
