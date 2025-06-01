/**
 * @swagger
 * tags:
 *   name: Result
 *   description: Result management
 */



/**
 * @swagger
 * /quiz/getResult/{id}:
 *   get:
 *     summary: Get results for a specific quiz
 *     tags:
 *       - Result
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the quiz
 *     responses:
 *       200:
 *         description: Quiz results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   score:
 *                     type: integer
 *                   answers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         question_id:
 *                           type: string
 *                         selected_option:
 *                           type: integer
 *                         is_correct:
 *                           type: boolean
 *       404:
 *         description: Results not found
 */