import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [StudyController],
  providers: [StudyService, PrismaService],
})
export class StudyModule {}
