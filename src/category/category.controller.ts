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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

type AuthRequest = ExpressRequest & { user?: { userId?: number } };

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    return this.categoryService.create({ ...createCategoryDto, createdById: userId });
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    return this.categoryService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
  // POST /categories/search
  @Post('search')
  search(@Body() filters: any, @Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    const scoped = { ...filters };
    if (!scoped.createdByIds) scoped.createdByIds = [userId];
    return this.categoryService.search(scoped);
  }
}
