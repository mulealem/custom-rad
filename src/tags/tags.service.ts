import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTagDto: CreateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async delete(id: number) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }

  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.tag.findMany({ where, take, skip, orderBy });
  }
}
