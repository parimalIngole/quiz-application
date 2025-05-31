import { IsString, IsArray, IsNotEmpty, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDTO } from './QuestionDto';

export class CreateQuizReqeustDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  questions!: QuestionDTO[];
}