import request from 'supertest';
import express from 'express';
import { SharedService } from '../services/SharedService';
import { AnswerController } from './AnswerController';
import { InMemoryDbRepo } from '../repository/InMemoryDbRepo';
import { NotFoundError, ValidationError } from '../utils/Errors';
import { Result } from '../entities/Result';

jest.mock('../repository/SharedService');
jest.mock('../services/SharedService');

// Test suite for the AnswerController
describe('AnswerController', () => {
  let app: express.Express;
  let sharedServiceMock: jest.Mocked<SharedService>;
  let db: InMemoryDbRepo;
  let answerController: AnswerController;

  // Runs before each test to set up a fresh instance of app and mocked dependencies
  beforeEach(() => {
    db = InMemoryDbRepo.getInstance();// In-memory DB for test isolation
    sharedServiceMock = new SharedService(db) as jest.Mocked<SharedService>;// Mock SharedService
    answerController = new AnswerController();
     // Override the real sharedService in controller with the mocked one
    (answerController as any).sharedService = sharedServiceMock;

    // Set up Express app and bind controller route
    app = express();
    app.use(express.json());
    app.post('/answer/submitAnswer', answerController.submitAnswer.bind(answerController));
   
  });

  // Test: Successful answer submission
  it('should submit an answer successfully', async () => {
    const requestData = {
      quizId: '123',
      userId: 'user1',
      questionId: 'q1',
      selectedOption: 1,
    };
  
     // Mock successful result from SharedService
    sharedServiceMock.submitAnswer.mockResolvedValue({
      isCorrect: true,
      correctOption: 1,
    });

     // Send POST request to the endpoint
    const response = await request(app).post('/answer/submitAnswer').send(requestData);
  
   // Assert response status and data
    expect(response.status).toBe(200);
    expect(response.body.status.message).toBe('Answer submitted successfully');
    expect(response.body.data).toEqual({
      isCorrect: true,
      correctOption: 1,
    });
  });
  //  Test: Missing required fields
  it('should return 400 if required fields are missing', async () => {
    // Simulate validation failure thrown by service
    sharedServiceMock.submitAnswer.mockRejectedValue(new ValidationError('Validation failed'));
    const response = await request(app).post('/answer/submitAnswer').send({
      quizId: '123', // Missing userId, questionId, and selectedOption
    });
    // Expect 400 Bad Request due to validation error
    expect(response.status).toBe(400);
    expect(response.body.status.message).toBe('Validation failed');
  });

  
  it('should return 400 if data types are invalid', async () => {
    sharedServiceMock.submitAnswer.mockRejectedValue(new ValidationError('Validation failed'));
    const response = await request(app).post('/answer/submitAnswer').send({
      quizId: 123, // Should be a string
      userId: 'user1',
      questionId: 'q1',
      selectedOption: 'one', // Should be a number
    });
  
    // Assert validation failure
    expect(response.status).toBe(400);
    expect(response.body.status.message).toBe('Validation failed');
  });

  // Test: Quiz not found scenario
  it('should return 404 if the quiz does not exist', async () => {
    sharedServiceMock.submitAnswer.mockRejectedValue(new NotFoundError('Quiz not found'));
  
    const response = await request(app).post('/answer/submitAnswer').send({
      quizId: 'non-existent',
      userId: 'user1',
      questionId: 'q1',
      selectedOption: 1,
    });
  
    // Expect 404 Not Found error
    expect(response.status).toBe(404);
    expect(response.body.status.message).toBe('Quiz not found');
  });
 
});