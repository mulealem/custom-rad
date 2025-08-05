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
exports.StudyController = void 0;
const common_1 = require("@nestjs/common");
const study_service_1 = require("./study.service");
const create_study_dto_1 = require("./dto/create-study.dto");
const update_study_dto_1 = require("./dto/update-study.dto");
let StudyController = class StudyController {
    studyService;
    constructor(studyService) {
        this.studyService = studyService;
    }
    create(createStudyDto) {
        return this.studyService.create(createStudyDto);
    }
    search(query) {
        return this.studyService.search(query);
    }
    findAll() {
        return this.studyService.findAll();
    }
    findOne(id) {
        return this.studyService.findOne(+id);
    }
    assignDoctor(studyIds, doctorId) {
        return this.studyService.assignDoctor(studyIds, doctorId);
    }
    update(id, updateStudyDto) {
        return this.studyService.update(+id, updateStudyDto);
    }
    remove(id) {
        return this.studyService.remove(+id);
    }
};
exports.StudyController = StudyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_study_dto_1.CreateStudyDto]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/assign-doctor'),
    __param(0, (0, common_1.Body)('studyIds')),
    __param(1, (0, common_1.Body)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "assignDoctor", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_study_dto_1.UpdateStudyDto]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudyController.prototype, "remove", null);
exports.StudyController = StudyController = __decorate([
    (0, common_1.Controller)('studies'),
    __metadata("design:paramtypes", [study_service_1.StudyService])
], StudyController);
//# sourceMappingURL=study.controller.js.map