import request from 'supertest';
import express from 'express';
import { ResultController } from './ResultController';
import { InMemoryDbRepo } from '../repository/InMemoryDbRepo';
import { SharedService } from '../services/SharedService';
import { NotFoundError, ValidationError } from '../utils/Errors';
import { Result } from '../entities/Result';

jest.mock('../repository/SharedService');
jest.mock('../services/SharedService');

// Test suite for the ResultController
describe('AnswerController', () => {
    let app: express.Express;
    let sharedServiceMock: jest.Mocked<SharedService>;
    let db: InMemoryDbRepo;
    let resultController: ResultController;

     // Set up a fresh test environment before each test
    beforeEach(() => {
        db = InMemoryDbRepo.getInstance();
        sharedServiceMock = new SharedService(db) as jest.Mocked<SharedService>;
        resultController = new ResultController();
         // Override the real sharedService with the mocked one in controller
        (resultController as any).sharedService = sharedServiceMock;

        // Set up a minimal Express app with JSON parsing and the controller route
        app = express();
        app.use(express.json());
        app.get('/result/getResult/:id', resultController.getResult.bind(resultController));
    });

 //  Test: Successfully retrieve quiz results
    it('should retrieve quiz results successfully', async () => {
        // Mock data to return from the shared service
        const mockResults: Result[] = [
            {
                quiz_id: '123',
                user_id: 'user1',
                score: 80,
                answers: [
                    { question_id: 'q1', selected_option: 1, is_correct: true },
                    { question_id: 'q2', selected_option: 3, is_correct: false },
                ],
            },
        ];
         // Mock the getResults method to resolve with the mock data
        sharedServiceMock.getResults.mockResolvedValue(mockResults);
         // Send GET request to fetch quiz results
        const response = await request(app).get('/result/getResult/123');
        // Assertions: correct response code, message, data, and service call
        expect(response.status).toBe(200);
        expect(response.body.status.message).toBe('Results retrieved successfully');
        expect(response.body.data).toEqual(mockResults);
        expect(sharedServiceMock.getResults).toHaveBeenCalledWith('123');
    });
     //  Test: Quiz not found scenario
    it('should return 404 if quiz does not exist', async () => {
         // Simulate the shared service throwing a NotFoundError
        sharedServiceMock.getResults.mockRejectedValue(new NotFoundError('Quiz not found'));
        // Attempt to retrieve results for a non-existent quiz
        const response = await request(app).get('/result/getResult/321');
         // Assertions: expect 404 and appropriate error message
        expect(response.status).toBe(404);
        expect(response.body.status.message).toBe('Quiz not found');
    });
});