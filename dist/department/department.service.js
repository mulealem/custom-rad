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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DepartmentService = class DepartmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createDepartmentDto) {
        return this.prisma.department.create({ data: createDepartmentDto });
    }
    findAll() {
        return this.prisma.department.findMany();
    }
    findOne(id) {
        return this.prisma.department.findUnique({ where: { id } });
    }
    update(id, updateDepartmentDto) {
        return this.prisma.department.update({
            where: { id },
            data: updateDepartmentDto,
        });
    }
    remove(id) {
        return this.prisma.department.delete({ where: { id } });
    }
    async search(filters) {
        const where = {};
        if (filters.Ids) {
            where.id = { in: filters.Ids };
        }
        if (filters.title)
            where.title = { contains: filters.title, mode: 'insensitive' };
        if (filters.abbreviation)
            where.abbreviation = {
                contains: filters.abbreviation,
                mode: 'insensitive',
            };
        if (filters.createdAtStart || filters.createdAtEnd) {
            where.createdAt = {};
            if (filters.createdAtStart) {
                where.createdAt.gte = new Date(filters.createdAtStart);
            }
            if (filters.createdAtEnd) {
                where.createdAt.lte = new Date(filters.createdAtEnd);
            }
        }
        const take = filters?.take ? Number(filters.take) : undefined;
        const skip = filters?.skip ? Number(filters.skip) : undefined;
        const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
        return this.prisma.department.findMany({ where, take, skip, orderBy });
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map