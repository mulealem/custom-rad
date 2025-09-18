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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyAttachmentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const study_attachment_service_1 = require("./study-attachment.service");
const create_study_attachment_dto_1 = require("./dto/create-study-attachment.dto");
const update_study_attachment_dto_1 = require("./dto/update-study-attachment.dto");
let StudyAttachmentController = class StudyAttachmentController {
    studyAttachmentService;
    constructor(studyAttachmentService) {
        this.studyAttachmentService = studyAttachmentService;
    }
    create(createStudyAttachmentDto) {
        return this.studyAttachmentService.create(createStudyAttachmentDto);
    }
    async uploadFile(file, studyId, studyTag, req) {
        const createdById = req.user?.userId;
        const result = await this.studyAttachmentService.uploadFile(file, studyId ? Number(studyId) : undefined, createdById);
        if (studyTag) {
            return this.studyAttachmentService.update(result.id, { studyTag });
        }
        return result;
    }
    findAll() {
        return this.studyAttachmentService.findAll();
    }
    findOne(id) {
        return this.studyAttachmentService.findOne(+id);
    }
    update(id, updateStudyAttachmentDto) {
        return this.studyAttachmentService.update(+id, updateStudyAttachmentDto);
    }
    remove(id) {
        return this.studyAttachmentService.remove(+id);
    }
    search(filters) {
        return this.studyAttachmentService.search(filters);
    }
};
exports.StudyAttachmentController = StudyAttachmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_study_attachment_dto_1.CreateStudyAttachmentDto]),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('studyId')),
    __param(2, (0, common_1.Body)('studyTag')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], StudyAttachmentController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_study_attachment_dto_1.UpdateStudyAttachmentDto]),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudyAttachmentController.prototype, "search", null);
exports.StudyAttachmentController = StudyAttachmentController = __decorate([
    (0, common_1.Controller)('studyAttachments'),
    __metadata("design:paramtypes", [study_attachment_service_1.StudyAttachmentService])
], StudyAttachmentController);
//# sourceMappingURL=study-attachment.controller.js.map