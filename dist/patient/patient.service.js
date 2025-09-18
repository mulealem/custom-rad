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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PatientService = class PatientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPatientDto) {
        return this.prisma.patient.create({ data: createPatientDto });
    }
    findAll() {
        return this.prisma.patient.findMany();
    }
    findOne(id) {
        return this.prisma.patient.findUnique({ where: { id } });
    }
    update(id, updatePatientDto) {
        return this.prisma.patient.update({
            where: { id },
            data: updatePatientDto,
        });
    }
    remove(id) {
        return this.prisma.patient.delete({ where: { id } });
    }
    async search(filters) {
        const where = {};
        if (filters.Ids)
            where.id = { in: filters.Ids };
        if (filters.createdByIds)
            where.createdById = { in: filters.createdByIds };
        if (filters.gender)
            where.gender = filters.gender;
        if (filters.name)
            where.name = { contains: filters.name, mode: 'insensitive' };
        if (filters.dateOfBirthStart || filters.dateOfBirthEnd) {
            where.dateOfBirth = {};
            if (filters.dateOfBirthStart)
                where.dateOfBirth.gte = new Date(filters.dateOfBirthStart);
            if (filters.dateOfBirthEnd)
                where.dateOfBirth.lte = new Date(filters.dateOfBirthEnd);
        }
        if (filters.createdAtStart || filters.createdAtEnd) {
            where.createdAt = {};
            if (filters.createdAtStart)
                where.createdAt.gte = new Date(filters.createdAtStart);
            if (filters.createdAtEnd)
                where.createdAt.lte = new Date(filters.createdAtEnd);
        }
        const take = filters?.take ? Number(filters.take) : undefined;
        const skip = filters?.skip ? Number(filters.skip) : undefined;
        const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
        return this.prisma.patient.findMany({ where, take, skip, orderBy });
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientService);
//# sourceMappingURL=patient.service.js.map