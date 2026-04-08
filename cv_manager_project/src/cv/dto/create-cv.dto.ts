import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @IsString()
  @IsNotEmpty()
  cin: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
