import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InstitutionController],
  providers: [InstitutionService, PrismaService],
})
export class InstitutionModule {}
