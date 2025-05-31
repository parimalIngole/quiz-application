import { IsString, IsNotEmpty, IsInt, Min } from "class-validator";


export class SubmitAnswerRequestDTO {
    @IsString()
    @IsNotEmpty()
    quizId!: string;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    questionId!: string;

    @IsInt()
    @Min(0)
    selectedOption!: number;
  }