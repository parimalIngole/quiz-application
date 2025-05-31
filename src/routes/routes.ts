import express, { Router } from 'express'
import { QuizController } from '../controllers/QuizController';
import { AnswerController } from '../controllers/AnswerController';
import { ResultController } from '../controllers/ResultController';

const quizController = new QuizController();
const answerController = new AnswerController();
const resultController = new ResultController();

const router = Router();

//Create Quiz
router.post('/quiz/create', (req, res) => {
    quizController.createQuiz(req, res);
});

//Get Quiz
router.get('/quiz/:id', (req, res) => {
    quizController.getQuiz(req, res);
});

//Submit Answers
router.post('/answer/submitAnswer', (req, res) => {
    answerController.submitAnswer(req, res);
});

//Get Result
router.get('/result/getResult/:id', (req, res) => {
    resultController.getResult(req, res);
});

export default router;