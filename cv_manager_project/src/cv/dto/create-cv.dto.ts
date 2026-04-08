import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCvDto {
  @ApiProperty({ example: 'Ben Ayed', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Kmar', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 25, description: 'Age (18-65)' })
  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @ApiProperty({ example: '12345678', description: 'National ID (CIN) — must be unique' })
  @IsString()
  @IsNotEmpty()
  cin: string;

  @ApiProperty({ example: 'Software Engineer', description: 'Job title' })
  @IsString()
  @IsNotEmpty()
  job: string;

  @ApiProperty({ example: 'cv_johndoe.pdf', description: 'Path to the CV file' })
  @IsString()
  @IsNotEmpty()
  path: string;
}
