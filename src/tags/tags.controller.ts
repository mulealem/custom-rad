import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
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
}
