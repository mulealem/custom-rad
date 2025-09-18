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

  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.studyIds) where.studyId = { in: filters.studyIds };
    if (filters.createdByIds) where.createdById = { in: filters.createdByIds };
    if (filters.remarkType)
      where.remarkType = { contains: filters.remarkType, mode: 'insensitive' };
    if (filters.content)
      where.content = { contains: filters.content, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.studyRemark.findMany({ where, take, skip, orderBy });
  }
}
