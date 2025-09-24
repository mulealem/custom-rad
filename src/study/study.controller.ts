import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  publish(
    @Param('id') id: string,
    @Body('html') html: string,
    @Req() req: Request,
  ) {
    console.log("req.user: ", req.user);
    return this.studyService.publish(+id, html, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyService.remove(+id);
  }
}
