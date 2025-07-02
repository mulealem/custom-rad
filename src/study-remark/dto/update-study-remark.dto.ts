import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyRemarkDto } from './create-study-remark.dto';

export class UpdateStudyRemarkDto extends PartialType(CreateStudyRemarkDto) {}
