import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.notesService.findAll(req.user.userId);
  }

  @Get(':referenceId')
  findOne(@Param('referenceId') referenceId: string, @Request() req) {
    return this.notesService.findOne(referenceId, req.user.userId);
  }

  @Patch(':referenceId')
  @UsePipes(new ValidationPipe())
  update(
    @Param('referenceId') referenceId: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req,
  ) {
    return this.notesService.update(
      referenceId,
      updateNoteDto,
      req.user.userId,
    );
  }

  @Delete(':referenceId')
  remove(@Param('referenceId') referenceId: string, @Request() req) {
    return this.notesService.remove(referenceId, req.user.userId);
  }
}
