import { Request, Response } from "express";
import { InMemoryDbRepo } from "../repository/InMemoryDbRepo";
import { SharedService } from "../services/SharedService";
import { handleError } from "../utils/ErrorHandler";
import { responseHandler } from "../utils/responseHandler";

const dbInstance = InMemoryDbRepo.getInstance();

// Controller class responsible for handling answer submission logic
export class AnswerController {
    // Private instance of SharedService to delegate business logic
    private sharedService: SharedService;

    // Initialize the controller with SharedService using a database instance
    constructor() {
        this.sharedService = new SharedService(dbInstance);
    }

    // Handler method for POST /submit-answer
    // Submits a user's answer to a quiz question
    async submitAnswer(req: Request, res: Response) {
        try {
            // Destructure required parameters from request body
            const { questionId, userId, quizId, selectedOption } = req.body;

            // Delegate answer processing to SharedService
            const response = await this.sharedService.submitAnswer(quizId, userId, questionId, selectedOption);

            // Send a successful response with the result data
            responseHandler(res, 200, 'Answer submitted successfully', response);
        } catch (error) {
            // Centralized error handler to manage and respond to any exceptions
            handleError(res, error);
        }

    }

}