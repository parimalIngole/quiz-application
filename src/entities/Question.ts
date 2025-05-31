import { Answer } from "./Answer";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_option: number;
}