import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'TypeScript', description: 'Skill designation — must be unique' })
  @IsString()
  @IsNotEmpty()
  designation: string;
}
