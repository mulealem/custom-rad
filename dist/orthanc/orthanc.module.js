"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrthancModule = void 0;
const common_1 = require("@nestjs/common");
const orthanc_service_1 = require("./orthanc.service");
const orthanc_controller_1 = require("./orthanc.controller");
const prisma_service_1 = require("../prisma.service");
const platform_express_1 = require("@nestjs/platform-express");
let OrthancModule = class OrthancModule {
};
exports.OrthancModule = OrthancModule;
exports.OrthancModule = OrthancModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                fileFilter: (req, file, callback) => {
                    const allowedTypes = [
                        'image/jpeg',
                        'image/png',
                        'application/pdf',
                        'application/zip',
                        'application/x-zip-compressed',
                    ];
                    if (allowedTypes.includes(file.mimetype)) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('Invalid file type: ' + file.mimetype), false);
                    }
                },
                limits: {
                    fileSize: 5005 * 1024 * 1024,
                },
            }),
        ],
        controllers: [orthanc_controller_1.OrthancController],
        providers: [orthanc_service_1.OrthancService, prisma_service_1.PrismaService],
    })
], OrthancModule);
//# sourceMappingURL=orthanc.module.js.map