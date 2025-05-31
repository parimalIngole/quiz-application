import { IsString, IsArray, IsNotEmpty, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionDTO {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  options!: string[];

  @IsInt()
  @Min(0)
  correct_option!: number;
}