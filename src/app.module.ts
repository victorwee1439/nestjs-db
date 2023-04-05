import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3305,
      username: 'root',
      password: 'victor9331439',
      database: 'school',
      autoLoadEntities: true,
      synchronize: true, // 数据库自动同步 entity 文件修改
    }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
