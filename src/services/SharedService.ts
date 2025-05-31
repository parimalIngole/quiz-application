import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from "class-transformer";
import { validate, validateOrReject, ValidationError } from "class-validator";
import { Quiz } from "../entities/Quiz";
import { CreateQuizReqeustDTO } from "../dtos/CreateQuizReqeustDTO";
import { InMemoryDbRepo } from "../repository/InMemoryDbRepo";
import { Result } from "../entities/Result";
import { NotFoundError } from "../utils/Errors";
import { SubmitAnswerRequestDTO } from "../dtos/SubmitAnswerRequestDto";



export class SharedService {

   // Injects the in-memory DB repository via constructor
  constructor(private readonly db: InMemoryDbRepo) { }

  //*Creates a new quiz with a unique ID and validated questions.
  async createQuiz(title: string, questions: Omit<Quiz['questions'][0], 'id'>[]): Promise<Quiz> {

    // Create DTO and assign incoming data
    const dto = new CreateQuizReqeustDTO();
    Object.assign(dto, { title, questions });
    try {
  // Validate input data
      await validateOrReject(dto);
    } catch (errors) {
      throw new ValidationError;
    }

  // Construct quiz object with unique quiz and question IDs
    const quiz: Quiz = {
      id: uuidv4(),
      title,
      questions: questions.map((q) => ({ ...q, id: uuidv4() })),
    };

 // Save to DB and return
    return this.db.createQuiz(quiz);
  }


  //Retrieves a quiz by its ID.
  getQuizById(id: string): Promise<Quiz> {
    return Promise.resolve(this.fetchQuizById(id));
  }


   /**
   * Handles answer submission and result tracking.
   * Validates the input, checks the answer, and updates the result.
   * return an object with `isCorrect` and the correct answer
   */
  async submitAnswer(
    quizId: string,
    userId: string,
    questionId: string,
    selectedOption: number
  ): Promise<{ isCorrect: boolean; correctOption: number }> {
    // DTO validation
    const dto = new SubmitAnswerRequestDTO();
    Object.assign(dto, { quizId, userId, questionId, selectedOption });
    try {
      // Input validation using DTO
      await validateOrReject(dto);
    } catch (errors) {
      throw new ValidationError();
    }

    // Fetch quiz and specific question
    const quiz = this.fetchQuizById(quizId);
    const question = this.fetchQuestion(quiz, questionId);

    // Determine if the answer is correct
    const isCorrect = question.correct_option === selectedOption;

    // Update result in the DB
    this.updateResult(quizId, userId, questionId, selectedOption, isCorrect);

     // Return result feedback
    return { isCorrect, correctOption: question.correct_option };
  }

  /**
   * Retrieves results for a specific quiz.
   * Throws NotFoundError if quiz doesn't exist.
   */
  getResults(quizId: string): Promise<Result[]> {
    const quiz = this.db.getQuiz(quizId);
    if (!quiz) {
      throw new NotFoundError(`Quiz not found`);
    }
    return Promise.resolve(this.db.getResults(quizId) || []);
  }

  /**
   * Internal helper to fetch a quiz or throw if not found.
   */
  private fetchQuizById(quizId: string): Quiz {
    const quiz = this.db.getQuiz(quizId);
    if (!quiz) {
      throw new NotFoundError(`Quiz not found`);
    }
    return quiz;
  }

  /**
   * Internal helper to fetch a question from a quiz or throw if not found.
   */
  private fetchQuestion(quiz: Quiz, questionId: string) {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) {
      throw new NotFoundError('Question not found');
    }
    return question;
  }

  /**
   * Updates the user's result with a new or updated answer.
   * Recalculates score accordingly and saves to the DB.
   */
  private updateResult(
    quizId: string,
    userId: string,
    questionId: string,
    selectedOption: number,
    isCorrect: boolean
  ): Result {

    // Retrieve all results for this quiz
    const allResults = this.db.getResults(quizId) || [];
    let userResult = allResults.find((result) => result.user_id === userId);

    if (!userResult) {
      userResult = {
        quiz_id: quizId,
        user_id: userId,
        score: 0,
        answers: [],
      };
      allResults.push(userResult);
    }

    // Check if the user already answered this question
    const existingAnswerIndex = userResult.answers.findIndex(
      (answer) => answer.question_id === questionId
    );

     
    if (existingAnswerIndex !== -1) {
      // If previously correct, subtract a point before updating
      const previousAnswer = userResult.answers[existingAnswerIndex];

    
      if (previousAnswer.is_correct) {
        userResult.score -= 1;
      }
      // Update the existing answer
      userResult.answers[existingAnswerIndex] = {
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
      };
    } else {
       // Add a new answer entry
      userResult.answers.push({
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
      });
    }

     // Add a point if the current answer is correct
    if (isCorrect) {
      userResult.score += 1;
    }


    // Persist results to the DB
    this.db.saveResults(quizId, allResults);

    return userResult;
  }
}






