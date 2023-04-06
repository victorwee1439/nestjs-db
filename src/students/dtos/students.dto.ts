import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class StudentDto {
    @IsNotEmpty()
    @IsString()
    id:number;
    name: string;
    
}
