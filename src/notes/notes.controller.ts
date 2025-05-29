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
  Query,
} from '@nestjs/common';
import { NotesService, ExternalApiResponse } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: { userId: number };
}

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: RequestWithUser,
  ) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.notesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    console.log('Finding note with id:', id);
    return this.notesService.findOne(Number(id));
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req: RequestWithUser,
  ) {
    return this.notesService.update(Number(id), updateNoteDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.notesService.remove(Number(id), req.user.userId);
  }

  @Post('orthanc/search')
  searchExternal(@Body() query: any): any {
    console.log('Searching external API with Orthanc');
    return this.notesService.queryExternalApiWithOrthanc(query);
  }

  @Get('studies/:referenceId')
  getNoteByReferenceId(@Param('referenceId') referenceId: string): any {
    return this.notesService.findByReferenceId(referenceId);
  }

  // get Orthanic Study By ID
  @Get('orthanc/studies/:studyId')
  getOrthancStudyById(@Param('studyId') studyId: string): any {
    return this.notesService.getOrthanicStudyByID(studyId);
  }
}
