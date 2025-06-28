import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudyService {
  constructor(private prisma: PrismaService) {}
  create(createStudyDto: CreateStudyDto) {
    return this.prisma.study.create({ data: createStudyDto });
  }

  findAll() {
    return this.prisma.study.findMany();
  }

  findOne(id: number) {
    return this.prisma.study.findUnique({ where: { id } });
  }

  update(id: number, updateStudyDto: UpdateStudyDto) {
    return this.prisma.study.update({
      where: { id },
      data: updateStudyDto,
    });
  }

  remove(id: number) {
    return this.prisma.study.delete({ where: { id } });
  }
}
