import { Request, Response } from "express";
import { handleError } from "../utils/ErrorHandler";
import { InMemoryDbRepo } from "../repository/InMemoryDbRepo";
import { SharedService } from "../services/SharedService";
import { responseHandler } from "../utils/responseHandler";

const dbInstance = InMemoryDbRepo.getInstance();

// Controller class responsible for handling quiz result-related operations
export class ResultController {

    // Instance of SharedService for business logic and data access
    private sharedService: SharedService;

    // Initialize the controller with a SharedService instance, passing the in-memory DB
    constructor() {
        this.sharedService = new SharedService(dbInstance);
    }

    // Retrieves quiz results for a specific quiz by its ID
    async getResult(req: Request, res: Response) {
        try {
            // Extract quiz ID from request parameters and fetch the result
            const result = await this.sharedService.getResults(req.params.id);

            // Extract quiz ID from request parameters and fetch the result
            responseHandler(res, 200, 'Results retrieved successfully', result);
        } catch (error) {
            handleError(res, error);
        }


    }

}