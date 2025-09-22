import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  create(createDepartmentDto: CreateDepartmentDto & { createdById?: number }) {
    return this.prisma.department.create({ data: createDepartmentDto });
  }

  findAll(createdById: number) {
    return this.prisma.department.findMany({ where: { createdById } });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }

  // Dynamic search method
  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) {
      where.id = { in: filters.Ids };
    }
    console.log('Search filters:: ', filters);
    if (filters.createdByIds) {
      where.createdById = { in: filters.createdByIds };
    }
    if (filters.title)
      where.title = { contains: filters.title, mode: 'insensitive' };
    if (filters.abbreviation)
      where.abbreviation = {
        contains: filters.abbreviation,
        mode: 'insensitive',
      };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) {
        where.createdAt.gte = new Date(filters.createdAtStart);
      }
      if (filters.createdAtEnd) {
        where.createdAt.lte = new Date(filters.createdAtEnd);
      }
    }
    // Add more attribute filters as needed
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.department.findMany({ where, take, skip, orderBy });
  }
}
