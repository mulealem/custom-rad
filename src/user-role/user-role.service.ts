import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.userRole.create({
      data: {
        role: createUserRoleDto.role,
        userId: createUserRoleDto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.userRole.findMany();
  }

  findOne(id: number) {
    return this.prisma.userRole.findUnique({ where: { id } });
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.userRole.update({
      where: { id },
      data: {
        role: '',
        userId: updateUserRoleDto.userId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.userRole.delete({ where: { id } });
  }

  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.userIds) where.userId = { in: filters.userIds };
    if (filters.role)
      where.role = { contains: filters.role, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.userRole.findMany({ where, take, skip, orderBy });
  }
}
