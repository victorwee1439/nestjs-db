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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql123',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true, // 数据库自动同步 entity 文件修改
    }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
