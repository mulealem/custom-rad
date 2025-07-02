"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyAttachmentModule = void 0;
const common_1 = require("@nestjs/common");
const study_attachment_service_1 = require("./study-attachment.service");
const study_attachment_controller_1 = require("./study-attachment.controller");
const prisma_service_1 = require("../prisma.service");
const platform_express_1 = require("@nestjs/platform-express");
let StudyAttachmentModule = class StudyAttachmentModule {
};
exports.StudyAttachmentModule = StudyAttachmentModule;
exports.StudyAttachmentModule = StudyAttachmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                fileFilter: (req, file, callback) => {
                    const allowedTypes = [
                        'image/jpeg',
                        'image/png',
                        'application/pdf',
                        'application/zip',
                    ];
                    if (allowedTypes.includes(file.mimetype)) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('Invalid file type'), false);
                    }
                },
                limits: {
                    fileSize: 5005 * 1024 * 1024,
                },
            }),
        ],
        controllers: [study_attachment_controller_1.StudyAttachmentController],
        providers: [study_attachment_service_1.StudyAttachmentService, prisma_service_1.PrismaService],
    })
], StudyAttachmentModule);
//# sourceMappingURL=study-attachment.module.js.map