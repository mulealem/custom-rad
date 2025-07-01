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

  search(query: any) {
    // query can include ids, patientIds, institutionIds, name, description, createdStartDate, createdEndDate
    // Example query: { ids: [1, 2, 3], patientIds: [4, 5], institutionIds: [6], name: 'Study Name', description: 'Study Description' }

    return this.prisma.study.findMany({
      where: {
        AND: [
          query.ids ? { id: { in: query.ids } } : {},
          query.patientIds ? { patientId: { in: query.patientIds } } : {},
          query.institutionIds
            ? { institutionId: { in: query.institutionIds } }
            : {},
          query.createdStartDate
            ? { createdAt: { gte: new Date(query.createdStartDate) } }
            : {},
          query.createdEndDate
            ? { createdAt: { lte: new Date(query.createdEndDate) } }
            : {},
        ],
      },
      include: {
        patient: true,
        institution: true,
      },
    });
  }

  findAll() {
    return this.prisma.study.findMany({
      include: {
        patient: true,
        institution: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.study.findUnique({
      where: { id },
      include: {
        patient: true,
        institution: true,
      },
    });
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
