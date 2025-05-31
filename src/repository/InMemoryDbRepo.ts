import { Quiz } from "../entities/Quiz";
import { Result } from "../entities/Result";

// Singleton class that simulates an in-memory database for quizzes and results
export class InMemoryDbRepo {
  // Stores quiz results: Map<quizId, Result[]>
  private results: Map<string, Result[]> = new Map();
  // Stores quizzes: Map<quizId, Quiz>
  private quizzes: Map<string, Quiz> = new Map();

  // Singleton instance reference
  private static instance: InMemoryDbRepo;

   // Private constructor to prevent direct instantiation
  private constructor() { }

  /**
   * Returns the singleton instance of the in-memory database.
   * Creates one if it doesn't exist.
   */
  public static getInstance(): InMemoryDbRepo {

    if (!InMemoryDbRepo.instance) {
      InMemoryDbRepo.instance = new InMemoryDbRepo();
    }
    return InMemoryDbRepo.instance;
  }


   
   //Saves a new quiz to the in-memory store.
   
  createQuiz(quiz: Quiz): Quiz {
    this.quizzes.set(quiz.id, quiz);
    return quiz;
  }

  //Retrieves a quiz by its ID.
  getQuiz(id: string): Quiz | undefined {
    return this.quizzes.get(id);
  }

  // Returns all quizzes stored in memory.
  getAllQuizzes(): Quiz[] {
    return Array.from(this.quizzes.values());
  }

  //Saves or updates quiz results in the store
  saveResults(quiz_id: string, results: Result[]): void {
    this.results.set(quiz_id, results);
  }

  //Retrieves results for a specific quiz.
  getResults(quiz_id: string): Result[] | undefined {
    return this.results.get(quiz_id);
  }
}