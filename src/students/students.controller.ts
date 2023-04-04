import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dtos/students.dto';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
    
    @Get()
    getstudent(@Query('type') type: string){
        return {type};
    }

    @Get(':id')
    getid(@Param('id') id: string){
        return {
            id
        };
    }
    @Post()
    createstudent(@Body() studentDto: StudentDto){
        return{name: studentDto.name};
    }
}
