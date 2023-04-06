import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Student } from './entities/students.entity';
import { Classes } from './entities/class.entity';
import { StudentDto } from './dtos/students.dto';


@Injectable()
export class StudentsService {
    private readonly logger = new Logger(StudentsService.name);

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Classes)
        private readonly classRepository: Repository<Classes>,
    ) {}

    ImStudent(name?: string) {
        this.logger.log(`student name is ${name}`);
        return 'Im student ' + name;
    }

    async getStudentName(id: number) {
        this.logger.log(`get student id is ${id}`);
        const results = await this.studentRepository.find({ where: { id: id} });
        return results ?? 'not found';
    }

    async getStudentByName(name: string) {
        this.logger.log(`get student id is ${name}`);
        const results = await this.studentRepository.find({ where: { name: name} });
        return results ?? undefined;
    }

    async setStudent(name: string) {
        const studentFound = await this.getStudentByName(name);
        console.log(typeof(studentFound));
        if (studentFound[0] != undefined) {
        return new HttpException("User already exists", HttpStatus.CONFLICT);
        }
        const results = await this.studentRepository.save({
            name: name,
        })
        console.log('results', results);
        return results;
    }

    async updateStudent(id:number, studentdto: Partial<StudentDto>){
        const students = await this.studentRepository.find({
            where: { id: studentdto.id}
        });
        if(studentdto == null){
            return new HttpException("ID defind", HttpStatus.CONFLICT);
        }
        const results = this.studentRepository.update({ id }, studentdto);
        return await this.studentRepository.findOne({ where:{id:id} });
    }

    async destroy(id: number) {
        await this.studentRepository.delete({ id });
        return { deleted: true };
      }

    async setClass(name: string, studentIds: number[]) {
        const students = await this.studentRepository.find({
            where: { id: In(studentIds)}
        });
        console.log('students', students);
        const result = await this.classRepository.save({
            className: name,
            students: students, // 此处直接保存students 的实例，即直接从数据库取出来的数据
        })

        return result;
    }
    async findClass(id: number) {
        const result = await this.classRepository.find({
            where: {
                id,
            },
            relations: ['students']
        })
        return result;
    }
}