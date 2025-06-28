import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
  // Additional methods for updating and deleting tags can be added here
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(Number(id));
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTagDto: CreateTagDto) {
    return this.tagsService.update(Number(id), updateTagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tagsService.delete(Number(id));
  }
}
