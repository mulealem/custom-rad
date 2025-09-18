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
exports.StudyRemarkController = void 0;
const common_1 = require("@nestjs/common");
const study_remark_service_1 = require("./study-remark.service");
const create_study_remark_dto_1 = require("./dto/create-study-remark.dto");
const update_study_remark_dto_1 = require("./dto/update-study-remark.dto");
let StudyRemarkController = class StudyRemarkController {
    studyRemarkService;
    constructor(studyRemarkService) {
        this.studyRemarkService = studyRemarkService;
    }
    create(createStudyRemarkDto) {
        return this.studyRemarkService.create(createStudyRemarkDto);
    }
    findAll() {
        return this.studyRemarkService.findAll();
    }
    findOne(id) {
        return this.studyRemarkService.findOne(+id);
    }
    update(id, updateStudyRemarkDto) {
        return this.studyRemarkService.update(+id, updateStudyRemarkDto);
    }
    remove(id) {
        return this.studyRemarkService.remove(+id);
    }
    search(filters) {
        return this.studyRemarkService.search(filters);
    }
};
exports.StudyRemarkController = StudyRemarkController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_study_remark_dto_1.CreateStudyRemarkDto]),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_study_remark_dto_1.UpdateStudyRemarkDto]),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudyRemarkController.prototype, "search", null);
exports.StudyRemarkController = StudyRemarkController = __decorate([
    (0, common_1.Controller)('studyRemarks'),
    __metadata("design:paramtypes", [study_remark_service_1.StudyRemarkService])
], StudyRemarkController);
//# sourceMappingURL=study-remark.controller.js.map