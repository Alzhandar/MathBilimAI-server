// server/src/routes/materialRoutes.ts

import { Router } from 'express';
import { createMaterial, getMaterialsByCategory, getMaterialById, deleteMaterial } from '../controllers/materialController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materials
 *   description: API для управления материалами
 */

/**
 * @swagger
 * /api/materials:
 *   post:
 *     summary: Создать новый материал
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Название материала
 *               category:
 *                 type: string
 *                 description: Категория материала
 *               theory:
 *                 type: string
 *                 description: Теория материала
 *               imageUrl:
 *                 type: string
 *                 description: URL изображения материала
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     level:
 *                       type: string
 *                       description: Уровень сложности упражнения (A, B, C)
 *                     question:
 *                       type: string
 *                       description: Вопрос упражнения
 *                     answer:
 *                       type: string
 *                       description: Ответ упражнения
 *     responses:
 *       201:
 *         description: Материал успешно создан
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', createMaterial);

/**
 * @swagger
 * /api/materials/category/{category}:
 *   get:
 *     summary: Получить материалы по категории
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Категория материала
 *     responses:
 *       200:
 *         description: Список материалов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/category/:category', getMaterialsByCategory);

/**
 * @swagger
 * /api/materials/{id}:
 *   get:
 *     summary: Получить материал по ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID материала
 *     responses:
 *       200:
 *         description: Материал
 *       404:
 *         description: Материал не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', getMaterialById);

/**
 * @swagger
 * /api/materials/{id}:
 *   delete:
 *     summary: Удалить материал по ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID материала
 *     responses:
 *       200:
 *         description: Материал успешно удален
 *       404:
 *         description: Материал не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', deleteMaterial);

export default router;
