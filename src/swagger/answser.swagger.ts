/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answer management
 */

/**
 * @swagger
 * /answer/submitAnswer:
 *   post:
 *     summary: Submit an answer for a specific question
 *     tags:
 *       - Answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               userId:
 *                 type: string
 *               questionId:
 *                 type: string
 *               selectedOption:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isCorrect:
 *                   type: boolean
 *                 correctOption:
 *                   type: integer
 *       404:
 *         description: Quiz or question not found
 *       400:
 *         description: Validation error
 */

