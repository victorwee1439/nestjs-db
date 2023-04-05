import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class StudentDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    name: string;
    
}
