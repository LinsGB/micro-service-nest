import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaConectorService],
})
export class AppModule {}
