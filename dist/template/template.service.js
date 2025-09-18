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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TemplateService = class TemplateService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createTemplateDto) {
        return this.prisma.template.create({ data: createTemplateDto });
    }
    findAll(createdById) {
        return this.prisma.template.findMany({
            where: createdById ? { createdById } : {},
            orderBy: [{ ordinal: 'asc' }, { createdAt: 'desc' }],
        });
    }
    findOne(id) {
        return this.prisma.template.findUnique({
            where: { id },
        });
    }
    update(id, updateTemplateDto) {
        return this.prisma.template.update({
            where: { id },
            data: updateTemplateDto,
        });
    }
    remove(id) {
        return this.prisma.template.delete({ where: { id } });
    }
    async search(filters) {
        const where = {};
        if (filters.Ids)
            where.id = { in: filters.Ids };
        if (filters.categoryIds)
            where.categoryId = { in: filters.categoryIds };
        if (filters.createdByIds)
            where.createdById = { in: filters.createdByIds };
        if (filters.title)
            where.title = { contains: filters.title, mode: 'insensitive' };
        if (filters.content)
            where.content = { contains: filters.content, mode: 'insensitive' };
        if (filters.createdAtStart || filters.createdAtEnd) {
            where.createdAt = {};
            if (filters.createdAtStart)
                where.createdAt.gte = new Date(filters.createdAtStart);
            if (filters.createdAtEnd)
                where.createdAt.lte = new Date(filters.createdAtEnd);
        }
        const take = filters?.take ? Number(filters.take) : undefined;
        const skip = filters?.skip ? Number(filters.skip) : undefined;
        let orderBy;
        if (filters?.orderBy && filters?.order) {
            orderBy = { [filters.orderBy]: filters.order };
        }
        else {
            orderBy = [
                { ordinal: 'asc' },
                { createdAt: 'desc' },
            ];
        }
        return this.prisma.template.findMany({ where, take, skip, orderBy });
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplateService);
//# sourceMappingURL=template.service.js.map