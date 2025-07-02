import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { StudyAttachmentService } from './study-attachment.service';
import { CreateStudyAttachmentDto } from './dto/create-study-attachment.dto';
import { UpdateStudyAttachmentDto } from './dto/update-study-attachment.dto';

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
  async uploadFile(
    // @Param('studyId') studyId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.studyAttachmentService.uploadFile(
      file,
      // , +studyId
    );
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
}
