import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student as Studentdb} from './entities/students.entity';
@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(Studentdb)
        private readonly studentRepository: Repository<Studentdb>,
    ) {}

    private readonly logger = new Logger(StudentsService.name);

    ImStudent(name?: string) {
        this.logger.log(`student name is ${name}`);
        return 'Im student ' + name;
    }

    //getStudentName(id: number) {
    //    const ID_NAME_MAP = {
    //        1: 'gdccwxx',
    //        2: 'victor',
    //       3: 'weile'
    //    };

    //    return ID_NAME_MAP[id] ?? 'not found';
    //}

    async getStudentName(id: number) {
        this.logger.log(`get student id is ${id}`);
        const results = await this.studentRepository.find({ where: { id: id} });
        return results ?? 'not found';
    }

    async saveStudent(name: string) {
        const results = this.studentRepository.save({ name });
        return results;
    }


}
