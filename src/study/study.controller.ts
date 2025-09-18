import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';

@Controller('studies')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Post()
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studyService.create(createStudyDto);
  }

  @Post('/search')
  search(@Body() query: any) {
    return this.studyService.search(query);
  }

  @Get()
  findAll() {
    return this.studyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyService.findOne(+id);
  }

  @Post('/assign-doctor')
  assignDoctor(
    @Body('studyIds') studyIds: number[],
    @Body('doctorId') doctorId: number,
  ) {
    return this.studyService.assignDoctor(studyIds, doctorId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studyService.update(+id, updateStudyDto);
  }

  @Post(':id/publish')
  publish(
    @Param('id') id: string,
    @Body('html') html: string,
  ) {
    return this.studyService.publish(+id, html);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyService.remove(+id);
  }
}
