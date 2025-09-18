import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}
  create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({ data: createPatientDto });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }

  // Dynamic search method
  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.createdByIds) where.createdById = { in: filters.createdByIds };
    if (filters.gender) where.gender = filters.gender;
    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };
    if (filters.dateOfBirthStart || filters.dateOfBirthEnd) {
      where.dateOfBirth = {};
      if (filters.dateOfBirthStart)
        where.dateOfBirth.gte = new Date(filters.dateOfBirthStart);
      if (filters.dateOfBirthEnd)
        where.dateOfBirth.lte = new Date(filters.dateOfBirthEnd);
    }
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart)
        where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd)
        where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.patient.findMany({ where, take, skip, orderBy });
  }
}
