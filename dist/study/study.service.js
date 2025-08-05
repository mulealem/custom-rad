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
exports.StudyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StudyService = class StudyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createStudyDto) {
        return this.prisma.study.create({ data: createStudyDto });
    }
    search(query) {
        return this.prisma.study.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.patientIds ? { patientId: { in: query.patientIds } } : {},
                    query.institutionIds
                        ? { institutionId: { in: query.institutionIds } }
                        : {},
                    query.createdStartDate
                        ? { createdAt: { gte: new Date(query.createdStartDate) } }
                        : {},
                    query.createdEndDate
                        ? { createdAt: { lte: new Date(query.createdEndDate) } }
                        : {},
                ],
            },
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    findAll() {
        return this.prisma.study.findMany({
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.study.findUnique({
            where: { id },
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    update(id, updateStudyDto) {
        return this.prisma.study.update({
            where: { id },
            data: updateStudyDto,
        });
    }
    assignDoctor(studyIds, doctorId) {
        return this.prisma.study.updateMany({
            where: { id: { in: studyIds } },
            data: { assignedDoctorId: doctorId ? doctorId : null },
        });
    }
    remove(id) {
        return this.prisma.study.delete({ where: { id } });
    }
};
exports.StudyService = StudyService;
exports.StudyService = StudyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudyService);
//# sourceMappingURL=study.service.js.map