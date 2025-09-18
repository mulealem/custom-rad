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
const path_1 = require("path");
const multer_1 = require("multer");
const fs_1 = require("fs");
let StudyAttachmentModule = class StudyAttachmentModule {
};
exports.StudyAttachmentModule = StudyAttachmentModule;
exports.StudyAttachmentModule = StudyAttachmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        const uploadsDir = (0, path_1.join)(process.cwd(), 'uploads');
                        if (!(0, fs_1.existsSync)(uploadsDir)) {
                            (0, fs_1.mkdirSync)(uploadsDir, { recursive: true });
                        }
                        cb(null, uploadsDir);
                    },
                    filename: (req, file, cb) => {
                        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname)}`;
                        cb(null, uniqueSuffix);
                    },
                }),
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