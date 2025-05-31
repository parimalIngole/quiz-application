import request from 'supertest';
import express from 'express';
import { InMemoryDbRepo } from '../repository/InMemoryDbRepo';
import { SharedService } from '../services/SharedService';
import { QuizController } from './QuizController';
import { NotFoundError, ValidationError } from '../utils/Errors';

jest.mock('../repository/SharedService');
jest.mock('../services/SharedService');

// Test suite for QuizController
describe('QuizController', () => {
    let app: express.Express;
    let quizController: QuizController;
    let db: InMemoryDbRepo;
    let sharedServiceMock: jest.Mocked<SharedService>;

     // Setup before each test
    beforeEach(() => {
        db = InMemoryDbRepo.getInstance(); // In-memory DB instance
        sharedServiceMock = new SharedService(db) as jest.Mocked<SharedService>;

        quizController = new QuizController();
         // Override the real sharedService inside the controller with the mocked version
        (quizController as any).sharedService = sharedServiceMock;

         // Initialize an express app and bind controller routes
        app = express();
        app.use(express.json());
        app.post('/quiz/create', quizController.createQuiz.bind(quizController));
        app.get('/quiz/:id', quizController.getQuiz.bind(quizController));
    });

    //Tests for POST /quiz/create
    describe('POST /quiz/create', () => {
        it('should create a quiz successfully', async () => {
            const quizData = {
                title: 'Sample Quiz',
                questions: [
                    {
                        id: 'question-1',
                        text: 'What is 2 + 2?',
                        options: ['2', '4', '6'],
                        correct_option: 3
                    }
                ]
            };
            // Mock service response
            sharedServiceMock.createQuiz.mockResolvedValue({
                id: '123',
                title: 'Sample Quiz',
                questions: [{ id: 'q1', text: 'What is 2 + 2?', options: ['2', '4', '6'], correct_option: 1 }]
            });

             // Send request and verify response
            const response = await request(app).post('/quiz/create').send(quizData);

            expect(response.body.status.code).toBe(201);
            expect(response.body.status.message).toBe('Quiz created successfully');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe('Sample Quiz');
        });

         //  Test: Quiz creation fails due to validation error
        it('should return a 400 error when quiz creation fails due to validation error', async () => {
             // Mock validation error
            sharedServiceMock.createQuiz.mockRejectedValue(new ValidationError('Validation failed'));

            const quizData = {
                title: '',
                questions: [],
            };

            const response = await request(app).post('/quiz/create').send(quizData);
            expect(response.status).toBe(400);
            expect(response.body.status.message).toBe('Validation failed');
        });

    });

   // Tests for GET /quiz/:id
    describe('GET /quiz/:id', () => {
      
        //  Successfully fetch a quiz by ID
        it('should retrieve a quiz by ID successfully', async () => {
            sharedServiceMock.getQuizById.mockResolvedValue({
                id: '123',
                title: 'Sample Quiz',
                questions: [{ id: 'q1', text: 'What is 2 + 2?', options: ['2', '4', '6'], correct_option: 1 }]
            });
            const response = await request(app).get('/quiz/123');

            expect(response.body.status.code).toBe(200);
            expect(response.body.status.message).toBe('Quiz retrieved successfully');
            expect(response.body.data).toHaveProperty('id', '123');
            expect(response.body.data.title).toBe('Sample Quiz');
        });

         //  Test: Quiz not found for given ID
        it('should return a 404 error when quiz is not found', async () => {
            sharedServiceMock.getQuizById.mockRejectedValue(new NotFoundError('Quiz not found'));

            const response = await request(app).get('/quiz/invalid-id');
            expect(response.body.status.code).toBe(404);
            expect(response.body.status.message).toBe('Quiz not found');
        });
    });
});