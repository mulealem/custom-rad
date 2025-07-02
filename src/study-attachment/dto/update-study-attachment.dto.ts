import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyAttachmentDto } from './create-study-attachment.dto';

export class UpdateStudyAttachmentDto extends PartialType(CreateStudyAttachmentDto) {}
