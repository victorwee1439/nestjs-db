import { Body, Controller, Get, Post, Query, ParseIntPipe, Put, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dtos/students.dto';
import { ClassesDto } from './dtos/classes.dto';
import { User } from '../common/decorators';
import { TransformNamePipe } from '../common/pipes/name.pipes';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Get('who-are-you')
    whoAreYou(@Query('name', TransformNamePipe) name: string) {
        return this.studentsService.ImStudent(name);
    }

    @Post('who-are-you')
    whoAreYouPost(@Body() student: StudentDto) {
        return this.studentsService.ImStudent(student.name);
    }

    @Post('who-is-request')
    whoIsReq(@User() name: string) {
        return name;
    }

    @Get('get-name-by-id')
    getNameById(@Query('id', ParseIntPipe) id: number) {
        return this.studentsService.getStudentName(id);
    }

    @Post('set-student-name')
    setStudentName(@User() name: string) {
        return this.studentsService.setStudent(name);
    }

    @Patch('update-student-name')
    updateStudentName(@Body() studentdto: Partial<StudentDto>) {
        return this.studentsService.updateStudent(studentdto.id, studentdto);
    }

    @Delete('delete-student-name')
      async deleteUser(@Body() studentDto: StudentDto) {
        return this.studentsService.destroy(studentDto.id);
      }

    @Get('get-class')
    getClass(@Query('id', ParseIntPipe) id: number) {
        return this.studentsService.findClass(id);
    }

    @Post('set-class')
    setClass(@Body() classes: ClassesDto) {
        return this.studentsService.setClass(classes.className, classes.students);
    }
}