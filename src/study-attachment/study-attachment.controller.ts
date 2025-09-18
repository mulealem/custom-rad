import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { StudyAttachmentService } from './study-attachment.service';
import { CreateStudyAttachmentDto } from './dto/create-study-attachment.dto';
import { UpdateStudyAttachmentDto } from './dto/update-study-attachment.dto';

type AuthRequest = ExpressRequest & { user?: { userId?: number } };

@Controller('studyAttachments')
export class StudyAttachmentController {
  constructor(
    private readonly studyAttachmentService: StudyAttachmentService,
  ) {}

  @Post()
  create(@Body() createStudyAttachmentDto: CreateStudyAttachmentDto) {
    return this.studyAttachmentService.create(createStudyAttachmentDto);
  }

  @Post('upload')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('studyId') studyId: string,
    @Body('studyTag') studyTag: string,
    @Req() req: AuthRequest,
  ) {
    const createdById = req.user?.userId;
    const result = await this.studyAttachmentService.uploadFile(
      file,
      studyId ? Number(studyId) : undefined,
      createdById,
    );
    if (studyTag) {
      return this.studyAttachmentService.update(result.id, { studyTag });
    }
    return result;
  }

  @Get()
  findAll() {
    return this.studyAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyAttachmentDto: UpdateStudyAttachmentDto,
  ) {
    return this.studyAttachmentService.update(+id, updateStudyAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyAttachmentService.remove(+id);
  }

  @Post('search')
  search(@Body() filters: any) {
    return this.studyAttachmentService.search(filters);
  }
}
