"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyModule = void 0;
const common_1 = require("@nestjs/common");
const study_service_1 = require("./study.service");
const study_controller_1 = require("./study.controller");
const prisma_service_1 = require("../prisma.service");
const pdf_module_1 = require("../pdf/pdf.module");
const orthanc_module_1 = require("../orthanc/orthanc.module");
const orthanc_service_1 = require("../orthanc/orthanc.service");
const study_upload_service_1 = require("./study-upload.service");
let StudyModule = class StudyModule {
};
exports.StudyModule = StudyModule;
exports.StudyModule = StudyModule = __decorate([
    (0, common_1.Module)({
        imports: [pdf_module_1.PdfModule, orthanc_module_1.OrthancModule],
        controllers: [study_controller_1.StudyController],
        providers: [study_service_1.StudyService, prisma_service_1.PrismaService, study_upload_service_1.StudyUploadService, orthanc_service_1.OrthancService],
    })
], StudyModule);
//# sourceMappingURL=study.module.js.map