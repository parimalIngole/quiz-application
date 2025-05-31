import {Answer} from '../entities/Answer'

export interface Result {
  quiz_id: string;
  user_id: string;
  score: number;
  answers: Answer[];
}