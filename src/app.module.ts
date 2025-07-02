import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PatientModule } from './patient/patient.module';
import { StudyModule } from './study/study.module';
import { DepartmentModule } from './department/department.module';
import { CategoryModule } from './category/category.module';
import { TemplateModule } from './template/template.module';
import { InstitutionModule } from './institution/institution.module';
import { OrthancModule } from './orthanc/orthanc.module';
import { HelpersService } from './helpers/helpers.service';
import { StudyRemarkModule } from './study-remark/study-remark.module';
import { StudyAttachmentModule } from './study-attachment/study-attachment.module';
import { PdfModule } from './pdf/pdf.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    NotesModule,
    TagsModule,
    UserRoleModule,
    PatientModule,
    StudyModule,
    DepartmentModule,
    CategoryModule,
    TemplateModule,
    InstitutionModule,
    OrthancModule,
    StudyRemarkModule,
    StudyAttachmentModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelpersService],
})
export class AppModule {}
