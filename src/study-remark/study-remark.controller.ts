import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudyRemarkService } from './study-remark.service';
import { CreateStudyRemarkDto } from './dto/create-study-remark.dto';
import { UpdateStudyRemarkDto } from './dto/update-study-remark.dto';

@Controller('studyRemarks')
export class StudyRemarkController {
  constructor(private readonly studyRemarkService: StudyRemarkService) {}

  @Post()
  create(@Body() createStudyRemarkDto: CreateStudyRemarkDto) {
    return this.studyRemarkService.create(createStudyRemarkDto);
  }

  @Get()
  findAll() {
    return this.studyRemarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyRemarkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyRemarkDto: UpdateStudyRemarkDto,
  ) {
    return this.studyRemarkService.update(+id, updateStudyRemarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyRemarkService.remove(+id);
  }
}
