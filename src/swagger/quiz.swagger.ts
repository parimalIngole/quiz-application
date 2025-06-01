/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz management
 */

/**
 * @swagger
 * /quiz/create:
 *   post:
 *     summary: Create a new quiz
 *     tags:
 *       - Quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correct_option:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /quiz/{id}:
 *   get:
 *     summary: Fetch a quiz by ID
 *     tags:
 *       - Quiz
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the quiz
 *     responses:
 *       200:
 *         description: Quiz details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       text:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: Quiz not found
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionDto:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The question text.
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The possible answers for the question.
 *         correct_option:
 *           type: integer
 *           description: The index of the correct option (starting from 0).
 *       required:
 *         - text
 *         - options
 *         - correct_option
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateQuizRequestDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the quiz.
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionDto'
 *       required:
 *         - title
 *         - questions
 */
