import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {

    addStudent(data?:string){
        return {
            msg:data
        };
      }
}
