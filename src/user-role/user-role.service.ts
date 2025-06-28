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
}
