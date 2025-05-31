import { Request, Response } from "express";
import { SharedService } from "../services/SharedService";
import { InMemoryDbRepo } from "../repository/InMemoryDbRepo";
import { handleError } from "../utils/ErrorHandler";
import { responseHandler } from "../utils/responseHandler";

const dbInstance = InMemoryDbRepo.getInstance();

// Controller class responsible for handling quiz-related endpoints
export class QuizController {

    // Instance of SharedService for handling business logic and data access
    private sharedService: SharedService;

    // Initialize the controller with SharedService using a database instance
    constructor() {
        this.sharedService = new SharedService(dbInstance);
    }
    // Creates a new quiz with a title and a list of questions
    async createQuiz(req: Request, res: Response) {
        try {
            // Extract quiz title and questions from request body
            const { title, questions } = req.body;

            // Delegate quiz creation to SharedService
            const quiz = await this.sharedService.createQuiz(title, questions);

            // Respond with 201 status and created quiz object
            responseHandler(res, 201, 'Quiz created successfully', quiz);
        } catch (error) {
            // Centralized error handler to manage and respond to any exceptions
            handleError(res, error);
        }

    }

    // Retrieves quiz details by quiz ID without exposing the correct answers
    async getQuiz(req: Request, res: Response) {
        try {

            // Fetch full quiz data including correct answers
            const quiz = await this.sharedService.getQuizById(req.params.id);

            // Exclude 'correct_option' from each question before sending to client
            const getQuizOnly = {
                ...quiz,
                questions: quiz?.questions.map(({ correct_option, ...q }) => q),
            };

            // Respond with 200 status and filtered quiz data
            responseHandler(res, 200, 'Quiz fetched successfully', getQuizOnly);
        } catch (error) {

            // Handle any errors using centralized error handler
            handleError(res, error);
        }

    }

}