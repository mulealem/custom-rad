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
}
