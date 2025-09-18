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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const create_note_dto_1 = require("./dtos/create-note.dto");
const update_note_dto_1 = require("./dtos/update-note.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const inspector_1 = require("inspector");
let NotesController = class NotesController {
    notesService;
    constructor(notesService) {
        this.notesService = notesService;
    }
    create(createNoteDto, req) {
        return this.notesService.create(createNoteDto, req.user.userId);
    }
    findAll(req) {
        return this.notesService.findAll(req.user.userId);
    }
    findOne(id, req) {
        inspector_1.console.log('Finding note with id:', id);
        return this.notesService.findOne(Number(id));
    }
    update(id, updateNoteDto, req) {
        return this.notesService.update(Number(id), updateNoteDto, req.user.userId);
    }
    remove(id, req) {
        return this.notesService.remove(Number(id), req.user.userId);
    }
    searchExternal(query) {
        inspector_1.console.log('Searching external API with Orthanc');
        return this.notesService.queryExternalApiWithOrthanc(query);
    }
    search(filters, req) {
        return this.notesService.search(filters, req.user.userId);
    }
    getNoteByReferenceId(referenceId) {
        return this.notesService.findByReferenceId(referenceId);
    }
    getOrthancStudyById(studyId) {
        return this.notesService.getOrthanicStudyByID(studyId);
    }
    handleFileUpload(fileBuffer) {
        inspector_1.console.log('Received file buffer for upload:', fileBuffer);
        try {
            if (!Buffer.isBuffer(fileBuffer)) {
                inspector_1.console.error('Invalid file data received:', fileBuffer);
                return Promise.resolve();
            }
            inspector_1.console.log('Received file buffer for upload:', fileBuffer.length, 'bytes');
            return Promise.resolve();
        }
        catch (error) {
            inspector_1.console.error('Error during file upload:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            return Promise.reject();
        }
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('orthanc/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], NotesController.prototype, "searchExternal", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('studies/:referenceId'),
    __param(0, (0, common_1.Param)('referenceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], NotesController.prototype, "getNoteByReferenceId", null);
__decorate([
    (0, common_1.Get)('orthanc/studies/:studyId'),
    __param(0, (0, common_1.Param)('studyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], NotesController.prototype, "getOrthancStudyById", null);
__decorate([
    (0, common_1.Post)('orthanc/upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buffer]),
    __metadata("design:returntype", Object)
], NotesController.prototype, "handleFileUpload", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map