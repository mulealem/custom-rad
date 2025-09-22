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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

type AuthRequest = ExpressRequest & { user?: { userId?: number } };

@UseGuards(AuthGuard('jwt'))
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    return this.departmentService.create({ ...createDepartmentDto, createdById: userId });
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    return this.departmentService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
  // POST /departments/search
  @Post('search')
  search(@Body() filters: any, @Req() req: AuthRequest) {
    const raw = req.user?.userId as any;
    const userId = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    if (!Number.isFinite(userId)) throw new UnauthorizedException('Invalid user');
    const scoped = { ...filters };
    if (!scoped.createdByIds) scoped.createdByIds = [userId];
    return this.departmentService.search(scoped);
  }
}
