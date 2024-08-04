import express from 'express';
import { submitTest, createCourse } from '../controllers/testController';

const router = express.Router();

/**
 * @swagger
 * /api/submit-test:
 *   post:
 *     summary: Отправка теста
 *     tags: [Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Тест успешно отправлен
 *       500:
 *         description: Ошибка при отправке теста
 */
router.post('/submit-test', submitTest);

/**
 * @swagger
 * /api/create-course:
 *   post:
 *     summary: Создание курса
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topics:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Курс успешно создан
 *       500:
 *         description: Ошибка при создании курса
 */
router.post('/create-course', createCourse);

export default router;
