"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tags_module_1 = require("./tags/tags.module");
const auth_module_1 = require("./auth/auth.module");
const notes_module_1 = require("./notes/notes.module");
const user_role_module_1 = require("./user-role/user-role.module");
const patient_module_1 = require("./patient/patient.module");
const study_module_1 = require("./study/study.module");
const department_module_1 = require("./department/department.module");
const category_module_1 = require("./category/category.module");
const template_module_1 = require("./template/template.module");
const institution_module_1 = require("./institution/institution.module");
const orthanc_module_1 = require("./orthanc/orthanc.module");
const helpers_service_1 = require("./helpers/helpers.service");
const study_remark_module_1 = require("./study-remark/study-remark.module");
const study_attachment_module_1 = require("./study-attachment/study-attachment.module");
const pdf_module_1 = require("./pdf/pdf.module");
const configuration_1 = require("./config/configuration");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            notes_module_1.NotesModule,
            tags_module_1.TagsModule,
            user_role_module_1.UserRoleModule,
            patient_module_1.PatientModule,
            study_module_1.StudyModule,
            department_module_1.DepartmentModule,
            category_module_1.CategoryModule,
            template_module_1.TemplateModule,
            institution_module_1.InstitutionModule,
            orthanc_module_1.OrthancModule,
            study_remark_module_1.StudyRemarkModule,
            study_attachment_module_1.StudyAttachmentModule,
            pdf_module_1.PdfModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, helpers_service_1.HelpersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map