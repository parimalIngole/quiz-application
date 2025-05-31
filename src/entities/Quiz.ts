import {Question} from '../entities/Question'


export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}