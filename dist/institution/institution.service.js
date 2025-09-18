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
exports.InstitutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let InstitutionService = class InstitutionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createInstitutionDto) {
        return this.prisma.institution.create({ data: createInstitutionDto });
    }
    findAll() {
        return this.prisma.institution.findMany();
    }
    findOne(id) {
        return this.prisma.institution.findUnique({ where: { id } });
    }
    update(id, updateInstitutionDto) {
        return this.prisma.institution.update({
            where: { id },
            data: updateInstitutionDto,
        });
    }
    remove(id) {
        return this.prisma.institution.delete({ where: { id } });
    }
    async search(filters) {
        const where = {};
        if (filters.Ids)
            where.id = { in: filters.Ids };
        if (filters.createdByIds)
            where.createdById = { in: filters.createdByIds };
        if (filters.title)
            where.title = { contains: filters.title, mode: 'insensitive' };
        if (filters.abbreviation)
            where.abbreviation = { contains: filters.abbreviation, mode: 'insensitive' };
        if (filters.slung)
            where.slung = { contains: filters.slung, mode: 'insensitive' };
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
        return this.prisma.institution.findMany({ where, take, skip, orderBy });
    }
};
exports.InstitutionService = InstitutionService;
exports.InstitutionService = InstitutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstitutionService);
//# sourceMappingURL=institution.service.js.map