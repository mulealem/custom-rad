import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}
  create(createInstitutionDto: CreateInstitutionDto) {
    return this.prisma.institution.create({ data: createInstitutionDto });
  }

  findAll() {
    return this.prisma.institution.findMany();
  }

  findOne(id: number) {
    return this.prisma.institution.findUnique({ where: { id } });
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return this.prisma.institution.update({
      where: { id },
      data: updateInstitutionDto,
    });
  }

  remove(id: number) {
    return this.prisma.institution.delete({ where: { id } });
  }

  // Dynamic search method
  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.createdByIds) where.createdById = { in: filters.createdByIds };
    if (filters.title) where.title = { contains: filters.title, mode: 'insensitive' };
    if (filters.abbreviation)
      where.abbreviation = { contains: filters.abbreviation, mode: 'insensitive' };
    if (filters.slung) where.slung = { contains: filters.slung, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.institution.findMany({ where, take, skip, orderBy });
  }
}
