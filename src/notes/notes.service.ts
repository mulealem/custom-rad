import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        referenceId: uuidv4(),
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  async findOne(referenceId: string, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: { referenceId },
    });
    if (!note || note.userId !== userId) {
      throw new UnauthorizedException('Note not found or access denied');
    }
    return note;
  }

  async update(
    referenceId: string,
    updateNoteDto: UpdateNoteDto,
    userId: number,
  ) {
    const note = await this.prisma.note.findUnique({
      where: { referenceId },
    });
    if (!note || note.userId !== userId) {
      throw new UnauthorizedException('Note not found or access denied');
    }
    return this.prisma.note.update({
      where: { referenceId },
      data: updateNoteDto,
    });
  }

  async remove(referenceId: string, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: { referenceId },
    });
    if (!note || note.userId !== userId) {
      throw new UnauthorizedException('Note not found or access denied');
    }
    return this.prisma.note.delete({
      where: { referenceId },
    });
  }
}
