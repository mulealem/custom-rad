import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}
  create(createTemplateDto: CreateTemplateDto & { createdById?: number }) {
    return this.prisma.template.create({ data: createTemplateDto });
  }

  findAll(createdById?: number) {
    return this.prisma.template.findMany({
      where: createdById ? { createdById } : {},
      orderBy: [{ ordinal: 'asc' }, { createdAt: 'desc' }],
    });
  }

  findOne(id: number) {
    return this.prisma.template.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prisma.template.update({
      where: { id },
      data: updateTemplateDto,
    });
  }

  remove(id: number) {
    return this.prisma.template.delete({ where: { id } });
  }

  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.categoryIds) where.categoryId = { in: filters.categoryIds };
    if (filters.createdByIds) where.createdById = { in: filters.createdByIds };
    if (filters.title)
      where.title = { contains: filters.title, mode: 'insensitive' };
    if (filters.content)
      where.content = { contains: filters.content, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    let orderBy: any;
    if (filters?.orderBy && filters?.order) {
      orderBy = { [filters.orderBy]: filters.order } as any;
    } else {
      orderBy = [
        { ordinal: 'asc' as const },
        { createdAt: 'desc' as const },
      ] as any;
    }
    return this.prisma.template.findMany({ where, take, skip, orderBy });
  }
}
