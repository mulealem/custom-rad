import { Module } from '@nestjs/common';
import { OrthancService } from './orthanc.service';
import { OrthancController } from './orthanc.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OrthancController],
  providers: [OrthancService, PrismaService],
})
export class OrthancModule {}
