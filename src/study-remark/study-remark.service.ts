import { Injectable } from '@nestjs/common';
import { CreateStudyRemarkDto } from './dto/create-study-remark.dto';
import { UpdateStudyRemarkDto } from './dto/update-study-remark.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudyRemarkService {
  constructor(private prisma: PrismaService) {}
  create(createStudyRemarkDto: CreateStudyRemarkDto) {
    return this.prisma.studyRemark.create({ data: createStudyRemarkDto });
  }

  findAll() {
    return this.prisma.studyRemark.findMany();
  }

  findOne(id: number) {
    return this.prisma.studyRemark.findUnique({ where: { id } });
  }

  update(id: number, updateStudyRemarkDto: UpdateStudyRemarkDto) {
    return this.prisma.studyRemark.update({
      where: { id },
      data: updateStudyRemarkDto,
    });
  }

  remove(id: number) {
    return this.prisma.studyRemark.delete({ where: { id } });
  }
}
