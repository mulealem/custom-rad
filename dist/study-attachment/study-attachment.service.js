"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyAttachmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const path_1 = require("path");
let StudyAttachmentService = class StudyAttachmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createStudyAttachmentDto) {
        return this.prisma.studyAttachment.create({
            data: createStudyAttachmentDto,
        });
    }
    async uploadFile(file) {
        console.log('File received:', file);
        if (!file) {
            throw new Error('File not provided');
        }
        const uploadPath = (0, path_1.join)(__dirname, '..', '..', 'uploads', file.originalname);
        return await this.prisma.studyAttachment.create({
            data: {
                fileName: file.originalname,
                filePath: uploadPath,
                fileType: file.mimetype,
                fileSize: file.size,
                studyId: 1,
            },
        });
    }
    findAll() {
        return this.prisma.studyAttachment.findMany();
    }
    findOne(id) {
        return this.prisma.studyAttachment.findUnique({ where: { id } });
    }
    update(id, updateStudyAttachmentDto) {
        return this.prisma.studyAttachment.update({
            where: { id },
            data: updateStudyAttachmentDto,
        });
    }
    remove(id) {
        return this.prisma.studyAttachment.delete({ where: { id } });
    }
};
exports.StudyAttachmentService = StudyAttachmentService;
exports.StudyAttachmentService = StudyAttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudyAttachmentService);
//# sourceMappingURL=study-attachment.service.js.map