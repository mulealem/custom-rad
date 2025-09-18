import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  // Dynamic search method
  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) {
      where.id = { in: filters.Ids };
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
    return this.prisma.category.findMany({ where, take, skip, orderBy });
  }
}
