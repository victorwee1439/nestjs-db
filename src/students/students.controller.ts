import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dtos/students.dto';
import { User } from '../common/decorators';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
    
    @Get()
    getstudent(@Query('type') type: string){
        return {type};
    }

    @Get('param/:type')
    getid(@Param('type') type: string){
        return {
            type
        };
    }

    //@Get('get-name-by-id')
    //getNameById(@Query('id', ParseIntPipe) id: number) {
    //    return this.studentsService.getStudentName(id);
    //}

    @Post()
    createstudent(@Body() studentDto: StudentDto){
        return{name: studentDto.name};
    }

    @Post('who-are-you')
    whoAreYouPost(@Body() student: StudentDto) {
        return this.studentsService.ImStudent(student.name);
    }

    @Post('who-is-request')
    whoIsReq(@User() user: string) {
        return user;
    }
    @Get('get-name-by-id')
    getNameById(@Query('id', ParseIntPipe) id: number) {
        return this.studentsService.getStudentName(id);
    }

    @Post('save-student-name')
    saveStudentName(@User() user: string) {
        return this.studentsService.saveStudent(user);
    }
}
