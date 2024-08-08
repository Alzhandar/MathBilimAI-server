import express from 'express';
import { addQuestion, getRandomQuestions, getQuestionsByDifficulty, deleteQuestion, deleteQuestionsByDifficulty, getTopics, getQuestionsByTopic, deleteQuestionsByTopic } from '../controllers/questionController';

const router = express.Router();

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Добавление нового вопроса
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                 correctAnswer:
 *                   type: string
 *                 difficulty:
 *                   type: string
 *                 topic:
 *                   type: string
 *     responses:
 *       201:
 *         description: Вопросы успешно добавлены
 *       500:
 *         description: Ошибка при добавлении вопроса
 */
router.post('/questions', addQuestion);

/**
 * @swagger
 * /api/questions/random:
 *   get:
 *     summary: Получение случайных вопросов
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         required: true
 *         description: Уровень сложности
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: Количество вопросов
 *     responses:
 *       200:
 *         description: Список случайных вопросов
 *       500:
 *         description: Ошибка при получении вопросов
 */
router.get('/questions/random', getRandomQuestions);

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Получение всех вопросов по уровню сложности
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         required: true
 *         description: Уровень сложности
 *     responses:
 *       200:
 *         description: Список вопросов
 *       500:
 *         description: Ошибка при получении вопросов
 */
router.get('/questions', getQuestionsByDifficulty);

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Удаление вопроса по ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID вопроса
 *     responses:
 *       200:
 *         description: Вопрос успешно удален
 *       500:
 *         description: Ошибка при удалении вопроса
 */
router.delete('/questions/:id', deleteQuestion);

/**
 * @swagger
 * /api/questions:
 *   delete:
 *     summary: Удаление всех вопросов по уровню сложности
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         required: true
 *         description: Уровень сложности
 *     responses:
 *       200:
 *         description: Все вопросы успешно удалены
 *       500:
 *         description: Ошибка при удалении вопросов
 */
router.delete('/questions', deleteQuestionsByDifficulty);

/**
 * @swagger
 * /api/questions/topics:
 *   get:
 *     summary: Получение списка тем
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Список тем
 *       500:
 *         description: Ошибка при получении тем
 */
router.get('/questions/topics', getTopics);

/**
 * @swagger
 * /api/questions/topic:
 *   get:
 *     summary: Получение вопросов по теме
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: Название темы
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: Количество вопросов
 *     responses:
 *       200:
 *         description: Список вопросов по теме
 *       500:
 *         description: Ошибка при получении вопросов по теме
 */
router.get('/questions/topic', getQuestionsByTopic);

/**
 * @swagger
 * /api/questions/topic:
 *   delete:
 *     summary: Удаление всех вопросов по теме
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: Название темы
 *     responses:
 *       200:
 *         description: Все вопросы по теме успешно удалены
 *       500:
 *         description: Ошибка при удалении вопросов по теме
 */
router.delete('/questions/topic', deleteQuestionsByTopic);

export default router;
