import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

type AuthRequest = ExpressRequest & { user?: { userId?: number } };

@UseGuards(AuthGuard('jwt'))
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto, @Req() req: AuthRequest) {
    const userId = Number(req.user?.userId);
    return this.templateService.create({
      ...createTemplateDto,
      createdById: userId,
    });
  }

  @Get()
  findAll(@Req() req: AuthRequest, @Query('all') all?: string) {
    const userId = Number(req.user?.userId);
    const includeAll = all === 'true';
    return this.templateService.findAll(includeAll ? undefined : userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }

  @Post('search')
  search(@Body() filters: any) {
    return this.templateService.search(filters);
  }
}
