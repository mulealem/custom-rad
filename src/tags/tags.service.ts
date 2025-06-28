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
}
