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
exports.OrthancController = void 0;
const common_1 = require("@nestjs/common");
const orthanc_service_1 = require("./orthanc.service");
const fs_1 = require("fs");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
let OrthancController = class OrthancController {
    orthancService;
    constructor(orthancService) {
        this.orthancService = orthancService;
    }
    extract(study) {
        return this.orthancService.extract(study);
    }
    upload(data) {
        return this.orthancService.upload(data);
    }
    async uploadBinary(req) {
        const fileName = `binary-${Date.now()}.bin`;
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', fileName);
        const writeStream = (0, fs_1.createWriteStream)(filePath);
        return new Promise((resolve, reject) => {
            console.log('Received binary data upload request');
            console.log('Uploading binary data to Orthanc:', fileName);
            const content = req.body;
            if (!content) {
                console.error('No content received in the request body');
                return reject(new Error('No content received'));
            }
        });
    }
    uploadFile(file) {
        if (!file) {
            throw new Error('File not provided');
        }
        console.log('Received file upload request');
        return this.orthancService.upload(file);
    }
};
exports.OrthancController = OrthancController;
__decorate([
    (0, common_1.Post)('extract'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrthancController.prototype, "extract", null);
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrthancController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('binary'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "uploadBinary", null);
__decorate([
    (0, common_1.Post)('multer'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrthancController.prototype, "uploadFile", null);
exports.OrthancController = OrthancController = __decorate([
    (0, common_1.Controller)('orthanc'),
    __metadata("design:paramtypes", [orthanc_service_1.OrthancService])
], OrthancController);
//# sourceMappingURL=orthanc.controller.js.map